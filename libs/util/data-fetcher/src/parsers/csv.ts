import * as Papa from 'papaparse'

export function openCsv(fileUrl: string) {
  return fetch(fileUrl)
    .then((response) => response.text())
    .then((csv) => {
      const parsed = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
      })
      if (parsed.errors.length) {
        throw new Error(
          'CSV parsing failed for the following reasons:\n' +
            parsed.errors
              .map(
                (error) =>
                  `* ${error.message} at row ${error.row}, column ${error.index}`
              )
              .join('\n')
        )
      }
      return parsed.data
    })
}
