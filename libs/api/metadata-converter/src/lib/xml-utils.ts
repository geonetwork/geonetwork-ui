import {
  parseXml,
  XmlComment,
  XmlDocument,
  XmlElement,
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
    if (!NAMESPACES[namespace]) {
      throw new Error(`No known URI for namespace ${namespace}`)
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
function stripNamespace(name: string): string {
  const colon = name.indexOf(':')
  return colon > -1 ? name.substring(colon + 1) : name
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

/**
 * Will return all matching elements nested according to the given
 * names (similar to a path), starting form the input element;
 * returns an empty array if no matching element
 */
export function findNestedElements(
  ...elementNames
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
    const textNode =
      el && Array.isArray(el.children)
        ? (el.children.find((node) => node.type === 'text') as XmlText)
        : null
    return textNode ? textNode.text : null
  }
}

export function readAttribute(
  attrName: string
): ChainableFunction<XmlElement, string> {
  return (el) => (el && el.attributes[attrName]) || null
}

export function xmlToString(
  el: XmlElement | XmlText | XmlComment | XmlDocument,
  indentationLevel = 0
) {
  if (el instanceof XmlDocument)
    return `<?xml version="1.0" encoding="UTF-8"?>${xmlToString(
      el.children[0]
    )}`
  if (el instanceof XmlText) {
    const text = el.text
    const isEmpty = !text || text.replace(/^\s+|\s+$/g, '') === ''
    if (isEmpty) return ''
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
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
    (prev, curr) => prev + ` ${curr}="${el.attributes[curr]}"`,
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

const NAMESPACES = {
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
}

/**
 * @param name Full name with namespace, e.g.: gmd:MD_Metadata
 */
export function createElement(
  name: string
): ChainableFunction<void, XmlElement> {
  return () => new XmlElement(name, {}, [])
}

export function addAttribute(
  name: string,
  value: string
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    element.attributes[name] = value
    return element
  }
}

// stays on the parent element
// if the given elements are part of a subtree, will add the root of subtree
export function appendChildren(
  ...childrenFns: Array<ChainableFunction<void, XmlElement>>
): ChainableFunction<XmlElement, XmlElement> {
  return (element) => {
    if (!element) return null
    element.children.push(
      ...childrenFns
        .map((fn) => fn())
        .map((el) => {
          let root = el
          while (root.parent instanceof XmlElement) {
            root = root.parent
          }
          return root
        })
    )
    element.children.forEach((el) => (el.parent = element))
    return element
  }
}

// switches to the child element
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

export function findChildOrCreate(
  name: string
): ChainableFunction<XmlElement, XmlElement> {
  return fallback(findChildElement(name, false), createChild(name))
}

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
    const children = childrenFn(element)
    children.forEach((child) => (child.parent = null))
    element.children = element.children.filter(
      (child) => child instanceof XmlElement && children.indexOf(child) === -1
    )
    return element
  }
}
