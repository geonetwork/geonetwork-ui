import {
  parseXml,
  XmlCdata,
  XmlComment,
  XmlDeclaration,
  XmlDocument,
  XmlDocumentType,
  XmlElement,
  XmlProcessingInstruction,
  XmlText,
} from '@rgrove/parse-xml'
import { ChainableFunction, fallback } from './function-utils'

export { XmlDocument, XmlElement } from '@rgrove/parse-xml'

export class XmlParseError extends Error {
  constructor(message) {
    super(message)
  }
}

/**
 * Parses a XML document as string, return a document object
 */
export function parseXmlString(xmlString: string): XmlDocument {
  let doc = null
  try {
    doc = parseXml(xmlString)
  } catch (e) {
    throw new XmlParseError(e instanceof Error ? e.message : e)
  }
  return doc
}

export function createDocument(rootEl: XmlElement): XmlDocument {
  rootEl.attributes = rootEl.attributes || {}

  function collectNamespaceFromName(name: string) {
    const namespace = extractNamespace(name)
    if (namespace === 'xmlns' || namespace === null) return
    if (rootEl.attributes[`xmlns:${namespace}`]) return
    if (!NAMESPACES[namespace]) {
      // the namespace is unknown but it might still be declared correctly: ignore it
      return
    }
    rootEl.attributes[`xmlns:${namespace}`] = NAMESPACES[namespace]
  }

  function collectNamespaces(el: XmlElement) {
    collectNamespaceFromName(el.name)
    for (const attr in el.attributes) {
      collectNamespaceFromName(attr)
    }
    const children = allChildrenElement(el)
    children.forEach(collectNamespaces)
  }

  collectNamespaces(rootEl)
  return new XmlDocument([rootEl])
}

/**
 * Will do nothing if no namespace present
 */
export function stripNamespace(name: string): string {
  const colon = name.indexOf(':')
  return colon > -1 ? name.substring(colon + 1) : name
}

export function getNamespace(name: string): string {
  const colon = name.indexOf(':')
  return colon > -1 ? name.substring(0, colon) : ''
}

function getElementName(element: XmlElement): string {
  return element.name || ''
}

export function getRootElement(xmlDoc: XmlDocument): XmlElement {
  return xmlDoc.children.find((el) => el instanceof XmlElement) as XmlElement
}

/**
 * Will return all matching elements (namespace will be ignored)
 */
export function findChildrenElement(
  name: string,
  nested = true
): ChainableFunction<XmlElement, Array<XmlElement>> {
  return (el) => {
    const strippedName = stripNamespace(name)
    function reducer(prev, curr) {
      if (stripNamespace(getElementName(curr)) === strippedName) {
        prev.push(curr)
      }

      if (nested && Array.isArray(curr.children)) {
        return [...prev, ...curr.children.reduce(reducer, [])]
      } else {
        return prev
      }
    }

    return el && Array.isArray(el.children)
      ? el.children.reduce(reducer, [])
      : []
  }
}

export function findChildElement(
  name: string,
  nested = true
): ChainableFunction<XmlElement, XmlElement> {
  return (el) => findChildrenElement(name, nested)(el)[0] || null
}

export function allChildrenElement(element: XmlElement): Array<XmlElement> {
  if (!element || !Array.isArray(element.children)) return []
  return [
    ...element.children.filter((el) => el instanceof XmlElement),
  ] as Array<XmlElement>
}

export function firstChildElement(element: XmlElement): XmlElement {
  return allChildrenElement(element)[0] ?? null
}

/**
 * Will return all matching elements nested according to the given
 * names (similar to a path), starting form the input element;
 * returns an empty array if no matching element
 */
export function findNestedElements(
  ...elementNames: string[]
): ChainableFunction<XmlElement, Array<XmlElement>> {
  return (el) => {
    function lookFor(elNameIndex: number) {
      const strippedName = stripNamespace(elementNames[elNameIndex])
      return (prev, curr) => {
        if (stripNamespace(getElementName(curr)) !== strippedName) {
          return prev
        }
        if (elNameIndex === elementNames.length - 1) {
          return [...prev, curr]
        }
        if (Array.isArray(curr.children)) {
          return [
            ...prev,
            ...curr.children.reduce(lookFor(elNameIndex + 1), []),
          ]
        }
        return prev
      }
    }

    return el && Array.isArray(el.children)
      ? el.children.reduce(lookFor(0), [])
      : []
  }
}

export function findNestedElement(
  ...elementNames: string[]
): ChainableFunction<XmlElement, XmlElement> {
  return (el) => {
    const found = findNestedElements(...elementNames)(el)
    return found.length ? found[0] : null
  }
}

// Will look through all the parents; returns null if no matching parent found.
export function findParent(
  parentName: string
): ChainableFunction<XmlElement, XmlElement> {
  return (el) => {
    let parent: XmlElement | XmlDocument = el.parent as XmlElement
    while (parent && parent instanceof XmlElement) {
      if (stripNamespace(getElementName(parent)) === stripNamespace(parentName))
        return parent
      parent = parent.parent
    }
    return null
  }
}

export function readText(): ChainableFunction<XmlElement, string> {
  return (el) => {
    if (!el) return null
    const textNode = Array.isArray(el.children)
      ? (el.children.find((node) => node.type === 'text') as XmlText)
      : null
    return textNode ? textNode.text : ''
  }
}

export function readAttribute(
  attrName: string
): ChainableFunction<XmlElement, string> {
  return (el) => (el && el.attributes[attrName]) || null
}

export function xmlToString(
  el:
    | XmlDocument
    | XmlElement
    | XmlComment
    | XmlProcessingInstruction
    | XmlDeclaration
    | XmlDocumentType
    | XmlCdata
    | XmlText,
  indentationLevel = 0
) {
  const encodeEntities = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
  if (el instanceof XmlDocument)
    return `<?xml version="1.0" encoding="UTF-8"?>${xmlToString(
      el.children[0]
    )}`
  if (el instanceof XmlText) {
    const text = el.text
    const isEmpty = !text || text.replace(/^\s+|\s+$/g, '') === ''
    if (isEmpty) return ''
    return encodeEntities(text)
  }
  if (!(el instanceof XmlElement)) return `<!-- unknown -->`

  const padding = '    '.repeat(indentationLevel)
  const children = Array.isArray(el.children)
    ? el.children
        .map((el) => xmlToString(el, indentationLevel + 1))
        .filter((el) => el !== '')
        .map((elString, index, array) =>
          index < array.length - 1 ? elString.replace(/\n\s*$/g, '') : elString
        )
        .join('')
    : ''
  const attrs = Object.keys(el.attributes).reduce(
    (prev, curr) => prev + ` ${curr}="${encodeEntities(el.attributes[curr])}"`,
    ''
  )
  const parentPadding = '    '.repeat(Math.max(0, indentationLevel - 1))
  if (children === '') {
    return `
${padding}<${el.name}${attrs}/>
${parentPadding}`
  }

  return `
${padding}<${el.name}${attrs}>${children}</${el.name}>
${parentPadding}`
}

/**
 * @param name
 * @returns namespace, null if none found
 */
function extractNamespace(name: string): string | null {
  const colon = name.indexOf(':')
  return colon > -1 ? name.substring(0, colon) : null
}

export const NAMESPACES = {
  gmd: 'http://www.isotc211.org/2005/gmd',
  gco: 'http://www.isotc211.org/2005/gco',
  gfc: 'http://www.isotc211.org/2005/gfc',
  gml: 'http://www.opengis.net/gml/3.2',
  xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  srv: 'http://www.isotc211.org/2005/srv',
  gmx: 'http://www.isotc211.org/2005/gmx',
  gts: 'http://www.isotc211.org/2005/gts',
  gsr: 'http://www.isotc211.org/2005/gsr',
  gmi: 'http://www.isotc211.org/2005/gmi',
  xlink: 'http://www.w3.org/1999/xlink',
  mdb: 'http://standards.iso.org/iso/19115/-3/mdb/2.0',
  mdq: 'http://standards.iso.org/iso/19157/-2/mdq/1.0',
  msr: 'http://standards.iso.org/iso/19115/-3/msr/2.0',
  mrs: 'http://standards.iso.org/iso/19115/-3/mrs/1.0',
  mmi: 'http://standards.iso.org/iso/19115/-3/mmi/1.0',
  mrl: 'http://standards.iso.org/iso/19115/-3/mrl/2.0',
  mdt: 'http://standards.iso.org/iso/19115/-3/mdt/2.0',
  mrd: 'http://standards.iso.org/iso/19115/-3/mrd/1.0',
  mds: 'http://standards.iso.org/iso/19115/-3/mds/2.0',
  mpc: 'http://standards.iso.org/iso/19115/-3/mpc/1.0',
  mcc: 'http://standards.iso.org/iso/19115/-3/mcc/1.0',
  mac: 'http://standards.iso.org/iso/19115/-3/mac/2.0',
  mco: 'http://standards.iso.org/iso/19115/-3/mco/1.0',
  mda: 'http://standards.iso.org/iso/19115/-3/mda/1.0',
  mex: 'http://standards.iso.org/iso/19115/-3/mex/1.0',
  gex: 'http://standards.iso.org/iso/19115/-3/gex/1.0',
  gcx: 'http://standards.iso.org/iso/19115/-3/gcx/1.0',
  mas: 'http://standards.iso.org/iso/19115/-3/mas/1.0',
  mri: 'http://standards.iso.org/iso/19115/-3/mri/1.0',
  cit: 'http://standards.iso.org/iso/19115/-3/cit/2.0',
  cat: 'http://standards.iso.org/iso/19115/-3/cat/1.0',
  lan: 'http://standards.iso.org/iso/19115/-3/lan/1.0',
  mrc: 'http://standards.iso.org/iso/19115/-3/mrc/2.0',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  foaf: 'http://xmlns.com/foaf/0.1/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  dcat: 'http://www.w3.org/ns/dcat#',
  dct: 'http://purl.org/dc/terms/',
  skos: 'http://www.w3.org/2004/02/skos/core#',
  schema_org: 'http://schema.org/',
  spdx: 'https://spdx.org/rdf/terms/#',
  adms: 'http://www.w3.org/ns/adms#',
  dqv: 'http://www.w3.org/ns/dqv#',
  owl: 'http://www.w3.org/2002/07/owl#',
  vcard: 'http://www.w3.org/2006/vcard/ns#',
  time: 'http://www.w3.org/2006/time#',
  locn: 'http://www.w3.org/ns/locn#',
  mdcat: 'https://data.vlaanderen.be/ns/metadata-dcat#',
}

/**
 * Creates a single element, without parent or children
 * @param name Full name with namespace, e.g.: gmd:MD_Metadata
 */
export function createElement(
  name: string
): ChainableFunction<void, XmlElement> {
  return () => new XmlElement(name, {}, [])
}

/**
 * Creates a tree of nested elements according to the given hierarchy
 * @param elementNames Full names with namespaces
 */
export function createNestedElement(
  ...elementNames: string[]
): ChainableFunction<void, XmlElement> {
  return () => {
    let current = null
    for (const name of elementNames) {
      current = current ? createChild(name)(current) : createElement(name)()
    }
    return current
  }
}

export function writeAttribute(
  name: string,
  value: string
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    element.attributes[name] = value
    return element
  }
}
function getTreeRoot(element: XmlElement): XmlElement {
  let root = element
  while (root.parent instanceof XmlElement) {
    root = root.parent
  }
  return root
}

/**
 * Appends the element returned by the given function to the children of the current active one
 * Note that if the function returns the tip of a subtree that was just created (i.e. not attached to the main document),
 * then the whole subtree will be attached to the current element as children (instead of just the tip of the subtree).
 * The created element (or tip of the created subtree) is returned and becomes the active element.
 * @param childrenFn
 */
export function appendChildTree(
  childrenFn: ChainableFunction<void, XmlElement>
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    if (!element) return null
    const treeTip = childrenFn()
    const treeRoot = getTreeRoot(treeTip)
    element.children.push(treeRoot)
    treeRoot.parent = element
    return treeTip
  }
}

/**
 * Leaves the current element as the active one; all elements returned by the given functions will be added as
 * children to this current element.
 * Note that if a function returns the tip of a subtree that was just created (i.e. not attached to the main document),
 * then the whole subtree will be attached to the current element as children (instead of just the tip of the subtree).
 * @param childrenFns Each function takes the parent as input and should return an element; if the returned value is
 * falsy then it will be ignored
 */
export function appendChildren(
  ...childrenFns: Array<ChainableFunction<void, XmlElement>>
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    if (!element) return null
    childrenFns.filter((fn) => fn).forEach((fn) => appendChildTree(fn)(element))
    return element
  }
}

/**
 * Creates an element, append it to the children of the current active element and switches to the
 * new element as the active one.
 * @param childName
 */
export function createChild(
  childName: string
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    if (!element) return null
    const child = createElement(childName)()
    element.children.push(child)
    child.parent = element
    return child
  }
}

/**
 * Creates a tree of nested elements according to the given hierarchy, appends it to the children of the current
 * active element and switches to the tip of the newly created tree of elements as the active one.
 * @param elementNames Full names with namespaces
 */
export function createNestedChild(
  ...elementNames: string[]
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    let current = element
    for (const name of elementNames) {
      current = createChild(name)(current)
    }
    return current
  }
}

/**
 * Returns the matching children if found, or create a new element, append it to the current active element
 * and switch to it as the active one.
 * @param name
 */
export function findChildOrCreate(
  name: string
): ChainableFunction<XmlElement, XmlElement> {
  return fallback(findChildElement(name, false), createChild(name))
}

/**
 * For each element name in the given hierarchy, either switch to a matching element if found,
 * or create a new one, append it to the children of the previous one and switch to it as the active one.
 * Eventually, the tip of the hierarchy (either existing or new element) becomes the active element.
 * @param elementNames
 */
export function findNestedChildOrCreate(
  ...elementNames: string[]
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    let current = element
    for (const name of elementNames) {
      current = findChildOrCreate(name)(current)
    }
    return current
  }
}

export function setTextContent(
  text: string
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    if (!element) return null
    const textEl = element.children.find(
      (el) => el instanceof XmlText
    ) as XmlText
    if (!textEl) {
      element.children.push(new XmlText(text))
    } else {
      textEl.text = text
    }
    return element
  }
}

export function removeAllChildren(): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    if (!element) return null
    element.children.forEach((el) => (el.parent = null))
    element.children = []
    return element
  }
}

// stays on the same element
export function removeChildrenByName(
  name: string
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    if (!element) return null
    const strippedName = stripNamespace(name)
    const removed = element.children.filter(
      (child) =>
        child instanceof XmlElement &&
        stripNamespace(getElementName(child)) === strippedName
    )
    removed.forEach((el) => (el.parent = null))
    element.children = element.children.filter(
      (child) => removed.indexOf(child) === -1
    )
    return element
  }
}

export function removeChildren(
  childrenFn: ChainableFunction<XmlElement, Array<XmlElement>>
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    const childrenToRemove = childrenFn(element)
    childrenToRemove.forEach((child) => (child.parent = null))
    element.children = element.children.filter(
      (child) =>
        child instanceof XmlElement && childrenToRemove.indexOf(child) === -1
    )
    return element
  }
}

/**
 * Renames elements in the XML tree according to the map
 * Either specify a full element name like 'gmd:MD_Metadata' or simply a namespace like 'gmd'
 * @param rootElement
 * @param replaceMap
 */
export function renameElements(
  rootElement: XmlElement,
  replaceMap: Record<string, string>
) {
  function doReplace(element: XmlElement) {
    if (element.name in replaceMap) {
      element.name = replaceMap[element.name]
    } else if (element.name && getNamespace(element.name) in replaceMap) {
      element.name = `${
        replaceMap[getNamespace(element.name)]
      }:${stripNamespace(element.name)}`
    }
    if (element.children) {
      element.children.forEach(doReplace)
    }
  }
  doReplace(rootElement)
  return rootElement
}

/**
 * This function use the DOMParser to check if the given xmlString is a valid XML file or throw an error
 * (Generated by chatGPT)
 * @param xmlString
 */
export function assertValidXml(xmlString: string): Document {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml')
  const parserError = xmlDoc.querySelector('parsererror')

  if (parserError) {
    console.error(parserError)
    throw new Error('File is not a valid XML.')
  }

  return xmlDoc
}
