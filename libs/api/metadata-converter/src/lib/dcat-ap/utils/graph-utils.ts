import { lit, Literal, Node, parse, Statement, Store } from 'rdflib'
import { Quad_Object, Quad_Predicate, Quad_Subject } from 'rdflib/lib/tf-types'
import { ContentType } from 'rdflib/lib/types'
import { BASE_URI } from './uri'

export function findNodeLocalized(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  object: Quad_Object,
  language: string
): Node | null {
  const literals = dataStore
    .each(subject, predicate, object)
    .filter((node): node is Literal => node instanceof Literal)
  const matchingLang = literals.find((node) =>
    node.language.startsWith(language)
  )
  const noLang = literals.find((node) => !node.language)
  const anyLang = literals[0]
  return matchingLang ?? noLang ?? anyLang
}

export function getOrAddStatement(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  object: Quad_Object | string
): Statement {
  let statement = dataStore.statementsMatching(
    subject,
    predicate,
    typeof object === 'string' ? null : object
  )[0]
  if (!statement) {
    statement = dataStore.add(subject, predicate, object) as Statement
  }
  return statement
}

export function getOrAddLiteral(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  objectValue: string
) {
  let statement = dataStore.statementsMatching(subject, predicate, null)[0]
  if (!statement) {
    statement = dataStore.add(subject, predicate, lit(objectValue)) as Statement
  } else {
    statement.object = lit(objectValue)
  }
  return statement
}

export function getOrAddLocalizedLiteral(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  objectValue: string,
  language: string
) {
  const statements = dataStore.statementsMatching(subject, predicate, null)
  const withMatchingLanguage = statements.filter(
    (statement) =>
      statement.object instanceof Literal &&
      statement.object.language.startsWith(language)
  )
  const withNoLanguage = statements.filter(
    (statement) =>
      statement.object instanceof Literal && !statement.object.language
  )
  let statement = withMatchingLanguage[0] || withNoLanguage[0]
  if (!statement) {
    statement = dataStore.add(
      subject,
      predicate,
      lit(objectValue, language)
    ) as Statement
  } else {
    statement.object = lit(objectValue, language)
  }
  return statement
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
