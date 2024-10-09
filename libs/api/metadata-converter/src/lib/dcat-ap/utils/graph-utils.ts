import { lit, Literal, parse, Statement, Store } from 'rdflib'
import { Quad_Object, Quad_Predicate, Quad_Subject } from 'rdflib/lib/tf-types'
import { ContentType } from 'rdflib/lib/types'
import { BASE_URI } from './uri'
import {
  FieldTranslation,
  LanguageCode,
  ModelTranslations,
} from '@geonetwork-ui/common/domain/model/record'

/**
 * This will find all literal nodes matching the criteria
 * and store their values inside the translations object. It will then
 * return the value in the default language
 */
export function readLocalizedValue<T extends ModelTranslations>(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  object: Quad_Object,
  fieldName: string,
  translations: T,
  defaultLanguage: string
): [string | null, T] {
  function readNodeLanguage(node: Literal): string {
    return node.language.toLowerCase().substring(0, 2)
  }

  const literals = dataStore
    .each(subject, predicate, object)
    .filter((node): node is Literal => node instanceof Literal)

  if (!literals.length) return [null, translations]

  const matchingDefault = literals.find(
    (node) => readNodeLanguage(node) === defaultLanguage
  )
  const noLang = literals.find((node) => !node.language)
  const defaultValue =
    matchingDefault?.value ?? noLang?.value ?? '(value not found)'
  const translationsSafe = translations ?? ({} as T)

  for (const literal of literals) {
    const language = readNodeLanguage(literal)
    if (language === defaultLanguage || !language) continue
    translationsSafe[fieldName] = {
      ...translationsSafe[fieldName],
      [language]: literal.value,
    }
  }

  return [defaultValue, translationsSafe]
}

export function getOrAddStatement(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  object: Quad_Object
): Statement {
  let statement = dataStore.statementsMatching(subject, predicate, object)[0]
  if (!statement) {
    statement = dataStore.add(subject, predicate, object) as Statement
  }
  return statement
}

export function writeLiteral(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  literalValue: string
): void {
  dataStore.removeStatements(
    dataStore.statementsMatching(subject, predicate, null)
  )
  dataStore.add(subject, predicate, lit(literalValue))
}

export function writeLocalizedLiteral(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  literalValue: string,
  translations: FieldTranslation,
  defaultLanguage: LanguageCode
): void {
  dataStore.removeStatements(
    dataStore.statementsMatching(subject, predicate, null)
  )
  dataStore.add(subject, predicate, lit(literalValue, defaultLanguage))
  if (!translations) {
    return
  }
  for (const language in translations) {
    const translatedValue = translations[language]
    dataStore.add(subject, predicate, lit(translatedValue, language))
  }
}

export function loadGraph(
  dataStore: Store,
  document: string,
  contentType: ContentType,
  base = BASE_URI
) {
  return new Promise((resolve) =>
    parse(document, dataStore, base, contentType, resolve)
  )
}
