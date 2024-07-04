import { lit, Literal, Node, parse, Statement, Store } from 'rdflib'
import { Quad_Object, Quad_Predicate, Quad_Subject } from 'rdflib/lib/tf-types'
import { ContentType, ObjectType } from 'rdflib/lib/types'
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

export function getOrAddLocalizedObject(
  dataStore: Store,
  subject: Quad_Subject,
  predicate: Quad_Predicate,
  object: Quad_Object | string,
  language: string
) {
  let statement = dataStore
    .statementsMatching(
      subject,
      predicate,
      typeof object === 'string' ? null : object
    )
    .filter(
      (statement) =>
        statement.object instanceof Literal &&
        statement.object.language.startsWith(language)
    )[0]
  if (!statement) {
    statement = dataStore.add(subject, predicate, object) as Statement
    ;(statement.object as Literal).language = language
  } else {
    statement.object =
      typeof object === 'string'
        ? lit(object, language)
        : (object as ObjectType)
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
