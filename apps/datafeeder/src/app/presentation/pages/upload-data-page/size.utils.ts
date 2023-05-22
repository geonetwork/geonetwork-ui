/**
 * @param dataSize In the format of the Spring Boot DataSize class
 * https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/unit/DataSize.html
 * @return size expressed in MB
 */
export function parseSizeAsMb(dataSize: string): number {
  const suffix = dataSize.match(/[A-Z]*$/)[0]
  const numericalPart = dataSize.substring(0, dataSize.length - suffix.length)
  const parsedSize = parseFloat(numericalPart)
  switch (suffix) {
    case 'TB':
      return parsedSize * 1024 * 1024
    case 'GB':
      return parsedSize * 1024
    case 'KB':
      return parsedSize / 1024
    case '':
    case 'B':
      return parsedSize / 1024 / 1024
    case 'MB':
      return parsedSize
    default:
      throw new Error('Parsing size as MB failed')
  }
}
