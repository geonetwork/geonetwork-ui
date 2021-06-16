import { Component, OnInit } from '@angular/core'
import { BootstrapService } from '@geonetwork-ui/util/shared'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { map, take, tap } from 'rxjs/operators'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
})
export class MainSearchComponent implements OnInit {
  table = [
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001024',
      LIEU_IDENTIFIANT: 1001024,
      LIEU_LIBELLE: '001-P-017 - Point 4 SRN Dunkerque',
      LIEU_MNEMONIQUE: '001-P-017',
      LATITUDE: '51.1513182889',
      LONGITUDE: '2.2508285996',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: '',
      TAXON_PRESENT: '',
      PROGRAMME: 'SRN',
      PARAMETRE:
        "Biologie/Phytoplancton/Chlorophylle a;Biologie/Phytoplancton/Flore Totale - abondance de cellules;Biologie/Phytoplancton/Phéopigments;Mesures physiques/Matériel particulaire/Matière en suspension;Mesures physiques/Matériel particulaire/Matière organique en suspension (ou MOP);Mesures physiques/Matériel particulaire/Turbidité;Mesures physiques/Matériel particulaire/Turbidité FNU;Mesures physiques/Température de l'eau;Nutriments/Nutriments Inorganiques/Ammonium;Nutriments/Nutriments Inorganiques/Azote nitreux (nitrite);Nutriments/Nutriments Inorganiques/Azote nitrique (nitrate);Nutriments/Nutriments Inorganiques/Nitrate + nitrite;Nutriments/Nutriments Inorganiques/Phosphate;Nutriments/Nutriments Inorganiques/Silicate;Physicochimie/Oxygène dissous;Physicochimie/pH;Physicochimie/Salinité",
      SUPPORT_NIVEAUPRELEVEMENT:
        "Niveau : Surface (0-1m);Support : Eau filtrée - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : Surface (0-1m)",
      THEME: 'Phytoplancton et hydrologie',
      DATEMIN: '1992/01/07',
      DATEMAX: '2021/05/12',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001025',
      LIEU_IDENTIFIANT: 1001025,
      LIEU_LIBELLE: '001-P-018 - Oye Daubelcourt',
      LIEU_MNEMONIQUE: '001-P-018',
      LATITUDE: '50.9998104724',
      LONGITUDE: '1.9519931276',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC02 - Jetée de Malo à Est cap Griz nez',
      TAXON_PRESENT: 'Mytilus edulis (moule commune)',
      PROGRAMME: 'REMI',
      PARAMETRE:
        'Microbiologie/Bactéries pathogènes/Salmonelles détectées;Microbiologie/Bactéries tests/Escherichia coli',
      SUPPORT_NIVEAUPRELEVEMENT:
        'Support : Bivalve - Mytilus edulis (moule commune) - Niveau : Emergé',
      THEME: 'Microbiologie',
      DATEMIN: '1993/02/23',
      DATEMAX: '1997/12/04',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001101',
      LIEU_IDENTIFIANT: 1001101,
      LIEU_LIBELLE: '001-P-019 - Dunkerque jetée est',
      LIEU_MNEMONIQUE: '001-P-019',
      LATITUDE: '51.0524834484',
      LONGITUDE: '2.3703340626',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC01 - Frontière belge à jetée de Malo',
      TAXON_PRESENT: 'Mytilus edulis (moule commune)',
      PROGRAMME: 'ROCCHMV',
      PARAMETRE:
        "Contaminants/Hydrocarbures PAH/Hydrocarbures polyaromatiques;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Fer;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matière sèche;Mesures physiques/Taille de l'individu;Toxico et Ecotoxicologie/Chimie-biochimie/Lipides totaux",
      SUPPORT_NIVEAUPRELEVEMENT:
        'Support : Bivalve - Mytilus edulis (moule commune) - Niveau : Emergé',
      THEME: 'Contaminants chimiques et écotoxicologie',
      DATEMIN: '1979/04/06',
      DATEMAX: '1985/09/17',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001102',
      LIEU_IDENTIFIANT: 1001102,
      LIEU_LIBELLE: '001-P-020 - Cap Blanc-Nez',
      LIEU_MNEMONIQUE: '001-P-020',
      LATITUDE: '50.9339',
      LONGITUDE: '1.715966667',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC02 - Jetée de Malo à Est cap Griz nez',
      TAXON_PRESENT: 'Mytilus edulis (moule commune)',
      PROGRAMME: 'REMI;ROCCHMV',
      PARAMETRE:
        "Contaminants/Hydrocarbures PAH/Acénaphtène;Contaminants/Hydrocarbures PAH/Anthracène;Contaminants/Hydrocarbures PAH/Benzo(a)anthracène;Contaminants/Hydrocarbures PAH/Benzo(a)pyrène;Contaminants/Hydrocarbures PAH/Benzo(b)fluoranthène;Contaminants/Hydrocarbures PAH/Benzo(g,h,i)pérylène;Contaminants/Hydrocarbures PAH/Benzo(k)fluoranthène;Contaminants/Hydrocarbures PAH/Chrysène;Contaminants/Hydrocarbures PAH/Dibenzo(a,h)anthracène;Contaminants/Hydrocarbures PAH/Fluoranthène;Contaminants/Hydrocarbures PAH/Fluorène;Contaminants/Hydrocarbures PAH/Hydrocarbures polyaromatiques;Contaminants/Hydrocarbures PAH/Indeno(1,2,3-cd) pyrène;Contaminants/Hydrocarbures PAH/Naphtalène;Contaminants/Hydrocarbures PAH/Phénanthrène;Contaminants/Hydrocarbures PAH/Pyrène;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Fer;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Congénère de PCB 101;Contaminants/Organohalogénés/Congénère de PCB 105;Contaminants/Organohalogénés/Congénère de PCB 118;Contaminants/Organohalogénés/Congénère de PCB 138;Contaminants/Organohalogénés/Congénère de PCB 153;Contaminants/Organohalogénés/Congénère de PCB 180;Contaminants/Organohalogénés/Congénère de PCB 28;Contaminants/Organohalogénés/Congénère de PCB 52;Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matière sèche;Mesures physiques/Taille de l'individu;Microbiologie/Bactéries pathogènes/Salmonelles détectées;Microbiologie/Bactéries tests/Escherichia coli;Microbiologie/Bactéries tests/Streptocoques fécaux;Toxico et Ecotoxicologie/Chimie-biochimie/Lipides totaux",
      SUPPORT_NIVEAUPRELEVEMENT:
        'Support : Bivalve - Mytilus edulis (moule commune) - Niveau : Emergé',
      THEME: 'Contaminants chimiques et écotoxicologie;Microbiologie',
      DATEMIN: '1979/05/15',
      DATEMAX: '2018/01/04',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001103',
      LIEU_IDENTIFIANT: 1001103,
      LIEU_LIBELLE: '001-P-021 - Waldam',
      LIEU_MNEMONIQUE: '001-P-021',
      LATITUDE: '50.9924771566',
      LONGITUDE: '1.9719937727',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC02 - Jetée de Malo à Est cap Griz nez',
      TAXON_PRESENT: 'Cerastoderma edule (coque)',
      PROGRAMME: 'ROCCHMV',
      PARAMETRE:
        "Contaminants/Hydrocarbures PAH/Hydrocarbures polyaromatiques;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Fer;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matière sèche;Mesures physiques/Taille de l'individu;Toxico et Ecotoxicologie/Chimie-biochimie/Lipides totaux",
      SUPPORT_NIVEAUPRELEVEMENT:
        'Support : Bivalve - Cerastoderma edule (coque) - Niveau : Emergé',
      THEME: 'Contaminants chimiques et écotoxicologie',
      DATEMIN: '1980/02/18',
      DATEMAX: '1986/11/06',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001104',
      LIEU_IDENTIFIANT: 1001104,
      LIEU_LIBELLE: '001-P-022 - Oye plage',
      LIEU_MNEMONIQUE: '001-P-022',
      LATITUDE: '51.002767',
      LONGITUDE: '2.00455',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC02 - Jetée de Malo à Est cap Griz nez',
      TAXON_PRESENT: 'Mytilus edulis (moule commune)',
      PROGRAMME: 'REMI;REPHY;REPHYTOX;ROCCHMV',
      PARAMETRE:
        "Biologie/Ecart-type sur la taille des individus de l'échantillon;Biologie/Indice de condition coquillage;Biologie/Poids sec de coquille;Chimie-biochimie/Toxines lipophiles/45-hydroxy-homo-Yessotoxine;Chimie-biochimie/Toxines lipophiles/45-hydroxy-Yessotoxine;Chimie-biochimie/Toxines lipophiles/Acide Okadaïque libre;Chimie-biochimie/Toxines lipophiles/Acide Okadaïque total;Chimie-biochimie/Toxines lipophiles/Acide seco-Pectenotoxine-2;Chimie-biochimie/Toxines lipophiles/Azaspiracide-1;Chimie-biochimie/Toxines lipophiles/Azaspiracide-2;Chimie-biochimie/Toxines lipophiles/Azaspiracide-3;Chimie-biochimie/Toxines lipophiles/Dinophysistoxine-1 libre;Chimie-biochimie/Toxines lipophiles/Dinophysistoxine-1 total;Chimie-biochimie/Toxines lipophiles/Dinophysistoxine-2 libre;Chimie-biochimie/Toxines lipophiles/Dinophysistoxine-2 total;Chimie-biochimie/Toxines lipophiles/Gymnodimine-A;Chimie-biochimie/Toxines lipophiles/Homo-Yessotoxine;Chimie-biochimie/Toxines lipophiles/Pectenotoxine-1;Chimie-biochimie/Toxines lipophiles/Pectenotoxine-2;Chimie-biochimie/Toxines lipophiles/Somme AO + DTXs + PTXs réglementées, avec TEFs;Chimie-biochimie/Toxines lipophiles/Somme des AZAs réglementées, avec TEFs;Chimie-biochimie/Toxines lipophiles/Somme des YTXs réglementées, avec TEFs;Chimie-biochimie/Toxines lipophiles/Spirolide-13-desmethyl-C;Chimie-biochimie/Toxines lipophiles/Spirolide-A;Chimie-biochimie/Toxines lipophiles/Spirolide-B;Chimie-biochimie/Toxines lipophiles/Spirolide-C;Chimie-biochimie/Toxines lipophiles/Spirolide-D;Chimie-biochimie/Toxines lipophiles/Yessotoxine;Contaminants/Biocides/Dibutylétain cation;Contaminants/Biocides/Irgarol;Contaminants/Hydrocarbures PAH/5-Methylchrysène;Contaminants/Hydrocarbures PAH/Acénaphtylène;Contaminants/Hydrocarbures PAH/Acénaphtène;Contaminants/Hydrocarbures PAH/Anthracène;Contaminants/Hydrocarbures PAH/Benzo(a)anthracène;Contaminants/Hydrocarbures PAH/Benzo(a)pyrène;Contaminants/Hydrocarbures PAH/Benzo(b)fluoranthène;Contaminants/Hydrocarbures PAH/Benzo(b,j)fluoranthène;Contaminants/Hydrocarbures PAH/Benzo(e)pyrène;Contaminants/Hydrocarbures PAH/Benzo(g,h,i)pérylène;Contaminants/Hydrocarbures PAH/Benzo(j)fluoranthène;Contaminants/Hydrocarbures PAH/Benzo(k)fluoranthène;Contaminants/Hydrocarbures PAH/Benzonaphthothiophènes;Contaminants/Hydrocarbures PAH/Benzo[c]fluorène;Contaminants/Hydrocarbures PAH/Chrysène;Contaminants/Hydrocarbures PAH/Chrysène-Triphénylène;Contaminants/Hydrocarbures PAH/Cyclopenta(c,d)pyrène;Contaminants/Hydrocarbures PAH/Dibenzo(a,h)anthracène;Contaminants/Hydrocarbures PAH/Dibenzothiophène;Contaminants/Hydrocarbures PAH/Dibenzo[a,e]pyrène;Contaminants/Hydrocarbures PAH/Dibenzo[a,h]pyrène;Contaminants/Hydrocarbures PAH/Dibenzo[a,i]pyrène;Contaminants/Hydrocarbures PAH/Dibenzo[a,l]pyrène;Contaminants/Hydrocarbures PAH/Diméthylchrysène;Contaminants/Hydrocarbures PAH/Diméthyldibenzothiophènes;Contaminants/Hydrocarbures PAH/Diméthylfluorènes;Contaminants/Hydrocarbures PAH/Diméthylnaphthalènes;Contaminants/Hydrocarbures PAH/Diméthylphenanthrènes/anthracènes;Contaminants/Hydrocarbures PAH/Diméthylpyrènes/fluoranthènes;Contaminants/Hydrocarbures PAH/Fluoranthène;Contaminants/Hydrocarbures PAH/Fluorène;Contaminants/Hydrocarbures PAH/Hydrocarbures polyaromatiques;Contaminants/Hydrocarbures PAH/Indeno(1,2,3-cd) pyrène;Contaminants/Hydrocarbures PAH/Monométhylbenzofluoranthènes;Contaminants/Hydrocarbures PAH/Monométhylbenzonaphthothiophènes;Contaminants/Hydrocarbures PAH/Monométhylchrysène;Contaminants/Hydrocarbures PAH/Monométhyldibenzothiophènes;Contaminants/Hydrocarbures PAH/Monométhylfluorènes;Contaminants/Hydrocarbures PAH/Monométhylnaphthalènes;Contaminants/Hydrocarbures PAH/Monométhylphenanthrènes/anthracènes;Contaminants/Hydrocarbures PAH/Monométhylpyrènes/fluoranthènes;Contaminants/Hydrocarbures PAH/Naphtalène;Contaminants/Hydrocarbures PAH/Phénanthrène;Contaminants/Hydrocarbures PAH/Pyrène;Contaminants/Hydrocarbures PAH/Triméthyldibenzothiophènes;Contaminants/Hydrocarbures PAH/Triméthylnaphthalènes;Contaminants/Hydrocarbures PAH/Triméthylphenanthrènes/anthracènes;Contaminants/Hydrocarbures PAH/Tétraméthylnaphthalènes;Contaminants/Métaux/Aluminium total;Contaminants/Métaux/Antimoine;Contaminants/Métaux/Argent;Contaminants/Métaux/Arsenic;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Chrome total;Contaminants/Métaux/Cobalt;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Etain total;Contaminants/Métaux/Fer;Contaminants/Métaux/Lithium;Contaminants/Métaux/Manganèse;Contaminants/Métaux/Mercure;Contaminants/Métaux/Molybdène;Contaminants/Métaux/Nickel;Contaminants/Métaux/Plomb;Contaminants/Métaux/Vanadium;Contaminants/Métaux/Zinc;Contaminants/Organiques autres/4-nonylphenols ramifiés;Contaminants/Organiques autres/Benzène;Contaminants/Organiques autres/Diéthylhexylphtalate (DEHP ou DOP);Contaminants/Organiques autres/Isoproturon;Contaminants/Organiques autres/Para-tert-octylphénol ramifiés;Contaminants/Organohalogénés/1,2,3,4,6,7,8- heptachlorodibenzo-p-dioxine;Contaminants/Organohalogénés/1,2,3,4,6,7,8-heptachlorodibenzofuran;Contaminants/Organohalogénés/1,2,3,4,7,8,9-heptachlorodibenzofuran;Contaminants/Organohalogénés/1,2,3,4,7,8-hexachlorodibenzo-p-dioxine;Contaminants/Organohalogénés/1,2,3,4,7,8-hexachlorodibenzofuran;Contaminants/Organohalogénés/1,2,3,6,7,8-hexachlorodibenzo-p-dioxine;Contaminants/Organohalogénés/1,2,3,6,7,8-hexachlorodibenzofuran;Contaminants/Organohalogénés/1,2,3,7,8,9-hexachlorodibenzo-p-dioxine;Contaminants/Organohalogénés/1,2,3,7,8,9-hexachlorodibenzofuran;Contaminants/Organohalogénés/1,2,3,7,8-pentachlorodibenzo-p-dioxine;Contaminants/Organohalogénés/1,2,3,7,8-pentachlorodibenzofuran;Contaminants/Organohalogénés/2,3,4,6,7,8-hexachlorodibenzofuran;Contaminants/Organohalogénés/2,3,4,7,8-pentachlorodibenzofuran;Contaminants/Organohalogénés/2,3,7,8-tetrachlorodibenzo-p-dioxine;Contaminants/Organohalogénés/2,3,7,8-tetrachlorodibenzofuran;Contaminants/Organohalogénés/Aclonifène;Contaminants/Organohalogénés/Alachlore;Contaminants/Organohalogénés/Aldrine;Contaminants/Organohalogénés/Alpha endosulfan;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Alpha-Hexabromocyclododecane;Contaminants/Organohalogénés/Atrazine;Contaminants/Organohalogénés/Beta endosulfan;Contaminants/Organohalogénés/Beta-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Beta-Hexabromocyclododecane;Contaminants/Organohalogénés/Bifénox;Contaminants/Organohalogénés/C10-13-chloroalcanes;Contaminants/Organohalogénés/Chloroforme;Contaminants/Organohalogénés/Chlorpyrifos éthyl;Contaminants/Organohalogénés/Congénère de PCB 101;Contaminants/Organohalogénés/Congénère de PCB 105;Contaminants/Organohalogénés/Congénère de PCB 114;Contaminants/Organohalogénés/Congénère de PCB 118;Contaminants/Organohalogénés/Congénère de PCB 123;Contaminants/Organohalogénés/Congénère de PCB 126;Contaminants/Organohalogénés/Congénère de PCB 138;Contaminants/Organohalogénés/Congénère de PCB 153;Contaminants/Organohalogénés/Congénère de PCB 156;Contaminants/Organohalogénés/Congénère de PCB 157;Contaminants/Organohalogénés/Congénère de PCB 167;Contaminants/Organohalogénés/Congénère de PCB 169;Contaminants/Organohalogénés/Congénère de PCB 180;Contaminants/Organohalogénés/Congénère de PCB 189;Contaminants/Organohalogénés/Congénère de PCB 205;Contaminants/Organohalogénés/Congénère de PCB 207;Contaminants/Organohalogénés/Congénère de PCB 28;Contaminants/Organohalogénés/Congénère de PCB 52;Contaminants/Organohalogénés/Congénère de PCB 77;Contaminants/Organohalogénés/Congénère de PCB 81;Contaminants/Organohalogénés/Cyperméthrine;Contaminants/Organohalogénés/Delta-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dibromodiphenyl ether (congénère 15);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane op';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Dichlorométhane;Contaminants/Organohalogénés/Dichloroéthane 12;Contaminants/Organohalogénés/Dichlorvos;Contaminants/Organohalogénés/Dicofol;Contaminants/Organohalogénés/Dicofol op';Contaminants/Organohalogénés/Dicofol pp'bis;Contaminants/Organohalogénés/Dieldrine;Contaminants/Organohalogénés/Diuron;Contaminants/Organohalogénés/Endrine;Contaminants/Organohalogénés/Gamma-Hexabromocyclododecane;Contaminants/Organohalogénés/HCB (Hexachlorobenzène);Contaminants/Organohalogénés/Heptachlo epoxyde exo cis;Contaminants/Organohalogénés/Heptachlore;Contaminants/Organohalogénés/Heptachlore époxyde endo;Contaminants/Organohalogénés/Hexachlorobutadiène;Contaminants/Organohalogénés/Isodrine;Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/octachlorodibenzo-p-dioxine;Contaminants/Organohalogénés/octachlorodibenzofuranne;Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Contaminants/Organohalogénés/pentabromodiphényl éther (congénère 85);Contaminants/Organohalogénés/Pentachlorobenzene;Contaminants/Organohalogénés/Pentachlorophénol;Contaminants/Organohalogénés/Polybromobiphényl congénère 153;Contaminants/Organohalogénés/Polybromodiphényléther congénère 100;Contaminants/Organohalogénés/Polybromodiphényléther congénère 138;Contaminants/Organohalogénés/Polybromodiphényléther congénère 153;Contaminants/Organohalogénés/Polybromodiphényléther congénère 154;Contaminants/Organohalogénés/Polybromodiphényléther congénère 17;Contaminants/Organohalogénés/Polybromodiphényléther congénère 183;Contaminants/Organohalogénés/Polybromodip",
      SUPPORT_NIVEAUPRELEVEMENT:
        'Support : Bivalve - Mytilus edulis (moule commune) - Niveau : Emergé;Support : Bivalve - Mytilus edulis (moule commune) - Niveau : Fond-sonde-1m',
      THEME:
        'Contaminants chimiques et écotoxicologie;Microbiologie;Phytoplancton et hydrologie',
      DATEMIN: '1987/06/29',
      DATEMAX: '2021/05/27',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001203',
      LIEU_IDENTIFIANT: 1001203,
      LIEU_LIBELLE: '001-P-027 - Dunkerque 3',
      LIEU_MNEMONIQUE: '001-P-027',
      LATITUDE: '51.1108175056',
      LONGITUDE: '2.2853305242',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: '',
      TAXON_PRESENT: '',
      PROGRAMME: 'RNOHYD',
      PARAMETRE:
        "Biologie/Phytoplancton/Chlorophylle a;Biologie/Phytoplancton/Phéopigments;Contaminants/Détergents/Détergents anioniques;Contaminants/Hydrocarbures général/Hydrocarbures totaux;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Fer;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organiques autres/Phtalates;Contaminants/Organohalogénés/Aldrine;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Dieldrine;Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matériel particulaire/Matière en suspension;Mesures physiques/Matériel particulaire/Profondeur Secchi;Mesures physiques/Matériel particulaire/Turbidité;Mesures physiques/Température de l'eau;Microbiologie/Bactéries tests/Coliformes thermotolérants;Microbiologie/Bactéries tests/Coliformes totaux;Microbiologie/Bactéries tests/Streptocoques fécaux;Nutriments/Nutriments Inorganiques/Ammonium;Nutriments/Nutriments Inorganiques/Azote nitreux (nitrite);Nutriments/Nutriments Inorganiques/Azote nitrique (nitrate);Nutriments/Nutriments Inorganiques/Nitrate + nitrite;Nutriments/Nutriments Inorganiques/Phosphate;Nutriments/Nutriments Inorganiques/Silicate;Physicochimie/Inorganiques majeurs/Fluorures;Physicochimie/Inorganiques majeurs/Sulfate;Physicochimie/Organiques majeurs/Carbone organique;Physicochimie/Oxygène dissous;Physicochimie/pH;Physicochimie/Salinité",
      SUPPORT_NIVEAUPRELEVEMENT:
        "Niveau : Surface (0-1m);Support : Eau filtrée - Niveau : Fond-sonde-1m;Support : Eau filtrée - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : Fond-sonde-1m;Support : Masse d'eau, eau brute - Niveau : Surface (0-1m);Support et Niveau : Sans Objet",
      THEME: 'Phytoplancton et hydrologie',
      DATEMIN: '1975/11/04',
      DATEMAX: '2007/06/12',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001204',
      LIEU_IDENTIFIANT: 1001204,
      LIEU_LIBELLE: '001-P-028 - Dunkerque 4',
      LIEU_MNEMONIQUE: '001-P-028',
      LATITUDE: '51.1524849837',
      LONGITUDE: '2.2503285549',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: '',
      TAXON_PRESENT: '',
      PROGRAMME: 'RNOHYD',
      PARAMETRE:
        "Biologie/Phytoplancton/Chlorophylle a;Biologie/Phytoplancton/Phéopigments;Contaminants/Détergents/Détergents anioniques;Contaminants/Hydrocarbures général/Hydrocarbures totaux;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Fer;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organiques autres/Phtalates;Contaminants/Organohalogénés/Aldrine;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane op';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane op';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Dieldrine;Contaminants/Organohalogénés/Heptachlore;Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matériel particulaire/Matière en suspension;Mesures physiques/Matériel particulaire/Profondeur Secchi;Mesures physiques/Matériel particulaire/Turbidité;Mesures physiques/Température de l'eau;Microbiologie/Bactéries tests/Coliformes thermotolérants;Microbiologie/Bactéries tests/Coliformes totaux;Microbiologie/Bactéries tests/Streptocoques fécaux;Nutriments/Nutriments Inorganiques/Ammonium;Nutriments/Nutriments Inorganiques/Azote nitreux (nitrite);Nutriments/Nutriments Inorganiques/Azote nitrique (nitrate);Nutriments/Nutriments Inorganiques/Nitrate + nitrite;Nutriments/Nutriments Inorganiques/Phosphate;Nutriments/Nutriments Inorganiques/Silicate;Physicochimie/Inorganiques majeurs/Fluorures;Physicochimie/Inorganiques majeurs/Sulfate;Physicochimie/Organiques majeurs/Carbone organique;Physicochimie/Oxygène dissous;Physicochimie/pH;Physicochimie/Salinité",
      SUPPORT_NIVEAUPRELEVEMENT:
        "Niveau : Surface (0-1m);Support : Eau filtrée - Niveau : Fond-sonde-1m;Support : Eau filtrée - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : Fond-sonde-1m;Support : Masse d'eau, eau brute - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : de 3 à 5 mètres;Support : Matière en suspension - Niveau : Surface (0-1m);Support et Niveau : Sans Objet",
      THEME: 'Phytoplancton et hydrologie',
      DATEMIN: '1975/11/04',
      DATEMAX: '2007/06/12',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001207',
      LIEU_IDENTIFIANT: 1001207,
      LIEU_LIBELLE: '001-P-029 - Dunkerque 7',
      LIEU_MNEMONIQUE: '001-P-029',
      LATITUDE: '51.0558166694',
      LONGITUDE: '2.3520002323',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC02 - Jetée de Malo à Est cap Griz nez',
      TAXON_PRESENT: '',
      PROGRAMME: 'RNOHYD',
      PARAMETRE:
        "Biologie/Phytoplancton/Chlorophylle a;Biologie/Phytoplancton/Phéopigments;Contaminants/Détergents/Détergents anioniques;Contaminants/Hydrocarbures général/Hydrocarbures totaux;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organohalogénés/Aldrine;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane op';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane op';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Dieldrine;Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matériel particulaire/Matière en suspension;Mesures physiques/Matériel particulaire/Profondeur Secchi;Mesures physiques/Matériel particulaire/Turbidité;Mesures physiques/Température de l'eau;Microbiologie/Bactéries tests/Coliformes thermotolérants;Microbiologie/Bactéries tests/Coliformes totaux;Microbiologie/Bactéries tests/Streptocoques fécaux;Nutriments/Nutriments Inorganiques/Ammonium;Nutriments/Nutriments Inorganiques/Azote nitreux (nitrite);Nutriments/Nutriments Inorganiques/Azote nitrique (nitrate);Nutriments/Nutriments Inorganiques/Nitrate + nitrite;Nutriments/Nutriments Inorganiques/Phosphate;Nutriments/Nutriments Inorganiques/Silicate;Physicochimie/Inorganiques majeurs/Fluorures;Physicochimie/Organiques majeurs/Carbone organique;Physicochimie/Oxygène dissous;Physicochimie/pH;Physicochimie/Salinité",
      SUPPORT_NIVEAUPRELEVEMENT:
        "Niveau : Surface (0-1m);Support : Eau filtrée - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : de 3 à 5 mètres;Support et Niveau : Sans Objet",
      THEME: 'Phytoplancton et hydrologie',
      DATEMIN: '1980/01/28',
      DATEMAX: '2007/06/12',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001105',
      LIEU_IDENTIFIANT: 1001105,
      LIEU_LIBELLE: '001-P-023 - Digue du Braek',
      LIEU_MNEMONIQUE: '001-P-023',
      LATITUDE: '51.0524825357',
      LONGITUDE: '2.2903323128',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC02 - Jetée de Malo à Est cap Griz nez',
      TAXON_PRESENT: 'Mytilus edulis (moule commune)',
      PROGRAMME: 'ROCCHMV',
      PARAMETRE:
        "Contaminants/Hydrocarbures PAH/Hydrocarbures polyaromatiques;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Congénère de PCB 101;Contaminants/Organohalogénés/Congénère de PCB 118;Contaminants/Organohalogénés/Congénère de PCB 138;Contaminants/Organohalogénés/Congénère de PCB 153;Contaminants/Organohalogénés/Congénère de PCB 180;Contaminants/Organohalogénés/Congénère de PCB 28;Contaminants/Organohalogénés/Congénère de PCB 52;Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matière sèche;Mesures physiques/Taille de l'individu",
      SUPPORT_NIVEAUPRELEVEMENT:
        'Support : Bivalve - Mytilus edulis (moule commune) - Niveau : Emergé',
      THEME: 'Contaminants chimiques et écotoxicologie',
      DATEMIN: '1991/02/04',
      DATEMAX: '1993/04/08',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001201',
      LIEU_IDENTIFIANT: 1001201,
      LIEU_LIBELLE: '001-P-025 - Dunkerque 1',
      LIEU_MNEMONIQUE: '001-P-025',
      LATITUDE: '51.0708169146',
      LONGITUDE: '2.33533277',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: 'FRAC02 - Jetée de Malo à Est cap Griz nez',
      TAXON_PRESENT: '',
      PROGRAMME: 'RNOHYD',
      PARAMETRE:
        "Biologie/Phytoplancton/Chlorophylle a;Biologie/Phytoplancton/Phéopigments;Contaminants/Détergents/Détergents anioniques;Contaminants/Hydrocarbures général/Hydrocarbures totaux;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Fer;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organiques autres/Phtalates;Contaminants/Organohalogénés/Aldrine;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane op';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane op';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Dieldrine;Contaminants/Organohalogénés/Heptachlore;Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matériel particulaire/Matière en suspension;Mesures physiques/Matériel particulaire/Profondeur Secchi;Mesures physiques/Matériel particulaire/Turbidité;Mesures physiques/Température de l'eau;Microbiologie/Bactéries tests/Coliformes thermotolérants;Microbiologie/Bactéries tests/Coliformes totaux;Microbiologie/Bactéries tests/Streptocoques fécaux;Nutriments/Nutriments Inorganiques/Ammonium;Nutriments/Nutriments Inorganiques/Azote nitreux (nitrite);Nutriments/Nutriments Inorganiques/Azote nitrique (nitrate);Nutriments/Nutriments Inorganiques/Nitrate + nitrite;Nutriments/Nutriments Inorganiques/Phosphate;Nutriments/Nutriments Inorganiques/Silicate;Physicochimie/Inorganiques majeurs/Fluorures;Physicochimie/Inorganiques majeurs/Sulfate;Physicochimie/Organiques majeurs/Carbone organique;Physicochimie/Oxygène dissous;Physicochimie/pH;Physicochimie/Salinité",
      SUPPORT_NIVEAUPRELEVEMENT:
        "Niveau : Surface (0-1m);Support : Eau filtrée - Niveau : Fond-sonde-1m;Support : Eau filtrée - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : Fond-sonde-1m;Support : Masse d'eau, eau brute - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : de 3 à 5 mètres;Support : Matière en suspension - Niveau : Surface (0-1m);Support et Niveau : Sans Objet",
      THEME: 'Phytoplancton et hydrologie',
      DATEMIN: '1975/11/04',
      DATEMAX: '2007/06/12',
    },
    {
      GRAPHES:
        'https://wwz.ifremer.fr/surval/Donnees/Graphes-30140#/sensor/1001202',
      LIEU_IDENTIFIANT: 1001202,
      LIEU_LIBELLE: '001-P-026 - Dunkerque 2',
      LIEU_MNEMONIQUE: '001-P-026',
      LATITUDE: '51.0758166412',
      LONGITUDE: '2.2986651574',
      DCSMM_SOUS_REGION: 'DCSMM sous-région Manche-Mer-du-Nord',
      QUADRIGE_ZONEMARINE: '001 - Frontière belge - Cap Gris Nez',
      DCE_MASSE_EAU: '',
      TAXON_PRESENT: '',
      PROGRAMME: 'RNOHYD',
      PARAMETRE:
        "Biologie/Phytoplancton/Chlorophylle a;Biologie/Phytoplancton/Phéopigments;Contaminants/Détergents/Détergents anioniques;Contaminants/Métaux/Cadmium;Contaminants/Métaux/Cuivre;Contaminants/Métaux/Fer;Contaminants/Métaux/Mercure;Contaminants/Métaux/Plomb;Contaminants/Métaux/Zinc;Contaminants/Organohalogénés/Aldrine;Contaminants/Organohalogénés/Alpha-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/Dichlorodiphényl dichloroéthylène pp';Contaminants/Organohalogénés/Dichlorodiphényl dichloréthane pp';Contaminants/Organohalogénés/Dichlorodiphényl trichloréthane pp';Contaminants/Organohalogénés/Dieldrine;Contaminants/Organohalogénés/Lindane ou gamma-HCH (Hexachlorocyclohexane);Contaminants/Organohalogénés/PCB totaux (Polychlorobiphényles);Mesures physiques/Matériel particulaire/Matière en suspension;Mesures physiques/Matériel particulaire/Profondeur Secchi;Mesures physiques/Matériel particulaire/Turbidité;Mesures physiques/Température de l'eau;Microbiologie/Bactéries tests/Coliformes thermotolérants;Microbiologie/Bactéries tests/Coliformes totaux;Microbiologie/Bactéries tests/Streptocoques fécaux;Nutriments/Nutriments Inorganiques/Ammonium;Nutriments/Nutriments Inorganiques/Azote nitreux (nitrite);Nutriments/Nutriments Inorganiques/Azote nitrique (nitrate);Nutriments/Nutriments Inorganiques/Phosphate;Nutriments/Nutriments Inorganiques/Silicate;Physicochimie/Inorganiques majeurs/Fluorures;Physicochimie/Inorganiques majeurs/Sulfate;Physicochimie/Organiques majeurs/Carbone organique;Physicochimie/Oxygène dissous;Physicochimie/pH;Physicochimie/Salinité",
      SUPPORT_NIVEAUPRELEVEMENT:
        "Niveau : Surface (0-1m);Support : Eau filtrée - Niveau : Fond-sonde-1m;Support : Eau filtrée - Niveau : Surface (0-1m);Support : Masse d'eau, eau brute - Niveau : Fond-sonde-1m;Support : Masse d'eau, eau brute - Niveau : Surface (0-1m);Support et Niveau : Sans Objet",
      THEME: 'Phytoplancton et hydrologie',
      DATEMIN: '1975/11/04',
      DATEMAX: '1994/10/20',
    },
  ]

  constructor(
    private bootstrap: BootstrapService,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.bootstrap
      .uiConfReady('srv')
      .pipe(
        take(1),
        map((config) => config.mods.search.facetConfig),
        tap((aggregationsConfig) => {
          this.searchFacade.setConfigAggregations(aggregationsConfig)
          this.searchFacade.requestMoreResults()
        })
      )
      .subscribe()
  }
}
