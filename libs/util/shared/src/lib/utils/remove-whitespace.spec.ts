import { removeWhitespace } from './remove-whitespace'

describe('#removeWhitespace', () => {
  it('returns undefined input is not defined', () => {
    const html = null
    expect(removeWhitespace(html)).toBe(undefined)
  })
  it('removes superfluent whitespace for a single word', () => {
    const html = ' hello '
    expect(removeWhitespace(html)).toBe('hello')
  })
  it('removes superfluent whitespace for a paragraph', () => {
    const html = `Service WFS pour les concentrations moyennes journalières des principaux polluants.
                                                                                                                                                                                                                                  
    Concentrations moyennes journalières issues du réseau fixe des principaux polluants réglementés dans l’air sur la région Hauts-de-France : dioxyde de soufre SO2, monoxyde d’azote NO et dioxyde d’azote NO2, particules en suspension PM10, particules en suspension PM2.5, ozone O3, benzène C6H6, monoxyde de carbone CO. Toutes les données fournies sont en μg/m³ (microgramme par mètre cube) sauf CO (mg/m³). Généalogie au sens Inspire : Mesures de terrain automatiques. Les concentrations moyennes ont été calculées conformément au guide méthodologique pour le calcul des statistiques relative à la qualité de l’air (LCSQA 2016) à partir des données mesurées selon`
    expect(removeWhitespace(html)).toBe(
      `Service WFS pour les concentrations moyennes journalières des principaux polluants. Concentrations moyennes journalières issues du réseau fixe des principaux polluants réglementés dans l’air sur la région Hauts-de-France : dioxyde de soufre SO2, monoxyde d’azote NO et dioxyde d’azote NO2, particules en suspension PM10, particules en suspension PM2.5, ozone O3, benzène C6H6, monoxyde de carbone CO. Toutes les données fournies sont en μg/m³ (microgramme par mètre cube) sauf CO (mg/m³). Généalogie au sens Inspire : Mesures de terrain automatiques. Les concentrations moyennes ont été calculées conformément au guide méthodologique pour le calcul des statistiques relative à la qualité de l’air (LCSQA 2016) à partir des données mesurées selon`
    )
  })
})
