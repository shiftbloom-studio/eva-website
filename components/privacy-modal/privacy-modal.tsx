import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
} from '@chakra-ui/react'

interface PrivacyModalProps {
    isOpen: boolean
    onClose: () => void
}

const datenschutzHtmlContent = `
<p>Stand: 20. Mai 2025</p>
<h2>Inhaltsübersicht</h2>
<ul class="index">
    <li><a class="index-link" href="#m3">Verantwortlicher</a></li>
    <li><a class="index-link" href="#mOverview">Übersicht der Verarbeitungen</a></li>
    <li><a class="index-link" href="#m2427">Maßgebliche Rechtsgrundlagen</a></li>
    <li><a class="index-link" href="#m27">Sicherheitsmaßnahmen</a></li>
    <li><a class="index-link" href="#m25">Übermittlung von personenbezogenen Daten</a></li>
    <li><a class="index-link" href="#m24">Internationale Datentransfers</a></li>
    <li><a class="index-link" href="#m12">Allgemeine Informationen zur Datenspeicherung und Löschung</a></li>
    <li><a class="index-link" href="#m10">Rechte der betroffenen Personen</a></li>
    <li><a class="index-link" href="#m225">Bereitstellung des Onlineangebots und Webhosting</a></li>
    <li><a class="index-link" href="#m134">Einsatz von Cookies</a></li>
    <li><a class="index-link" href="#m104">Blogs und Publikationsmedien</a></li>
    <li><a class="index-link" href="#m182">Kontakt- und Anfrageverwaltung</a></li>
    <li><a class="index-link" href="#m263">Webanalyse, Monitoring und Optimierung</a></li>
    <li><a class="index-link" href="#m264">Onlinemarketing</a></li>
    <li><a class="index-link" href="#m136">Präsenzen in sozialen Netzwerken (Social Media)</a></li>
    <li><a class="index-link" href="#m328">Plug-ins und eingebettete Funktionen sowie Inhalte</a></li>
</ul>
<h2 id="m3">Verantwortlicher</h2>
<p>Fabian Matthias, Zimber / Einzelunternehmer<br>Up de Worth, 6a<br>22927, Grosshansdorf, Deutschland</p>
<p>E-Mail-Adresse: <a href="mailto:projektleitung@erbe-von-arda.de">projektleitung@erbe-von-arda.de</a></p>

<h2 id="mOverview">Übersicht der Verarbeitungen</h2>
<p>Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und
    verweist auf die betroffenen Personen.</p>
<h3>Arten der verarbeiteten Daten</h3>
<ul>
    <li>Bestandsdaten.</li>
    <li>Kontaktdaten.</li>
    <li>Inhaltsdaten.</li>
    <li>Nutzungsdaten.</li>
    <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
    <li>Protokolldaten.</li>
</ul>
<h3>Kategorien betroffener Personen</h3>
<ul>
    <li>Kommunikationspartner.</li>
    <li>Nutzer.</li>
</ul>
<h3>Zwecke der Verarbeitung</h3>
<ul>
    <li>Kommunikation.</li>
    <li>Sicherheitsmaßnahmen.</li>
    <li>Reichweitenmessung.</li>
    <li>Tracking.</li>
    <li>Zielgruppenbildung.</li>
    <li>Organisations- und Verwaltungsverfahren.</li>
    <li>Feedback.</li>
    <li>Marketing.</li>
    <li>Profile mit nutzerbezogenen Informationen.</li>
    <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
    <li>Informationstechnische Infrastruktur.</li>
    <li>Öffentlichkeitsarbeit.</li>
</ul>
<h2 id="m2427">Maßgebliche Rechtsgrundlagen</h2>
<p><strong>Maßgebliche Rechtsgrundlagen nach der DSGVO: </strong>Im Folgenden erhalten Sie eine Übersicht der
    Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte nehmen Sie zur Kenntnis,
    dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten
    können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der
    Datenschutzerklärung mit.</p>
<ul>
    <li><strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> - Die betroffene Person hat ihre Einwilligung
        in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere
        bestimmte Zwecke gegeben.</li>
    <li><strong>Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</strong> - Die
        Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur
        Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.</li>
    <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> - die Verarbeitung ist zur Wahrung
        der berechtigten Interessen des Verantwortlichen oder eines Dritten notwendig, vorausgesetzt, dass die
        Interessen, Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten
        verlangen, nicht überwiegen.</li>
</ul>
<p><strong>Nationale Datenschutzregelungen in Deutschland: </strong>Zusätzlich zu den Datenschutzregelungen der DSGVO
    gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor
    Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält
    insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur
    Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung
    sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können
    Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.</p>
<p><strong>Nationale Datenschutzregelungen in Österreich: </strong>Zusätzlich zu den Datenschutzregelungen der DSGVO
    gelten nationale Regelungen zum Datenschutz in Österreich. Hierzu gehört insbesondere das Bundesgesetz zum Schutz
    natürlicher Personen bei der Verarbeitung personenbezogener Daten (Datenschutzgesetz – DSG). Das Datenschutzgesetz
    enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Richtigstellung oder Löschung, zur
    Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung
    sowie zur automatisierten Entscheidungsfindung im Einzelfall.</p>
<p><strong>Maßgebliche Rechtsgrundlagen nach dem Schweizer Datenschutzgesetz: </strong>Wenn Sie sich in der Schweiz
    befinden, bearbeiten wir Ihre Daten auf Grundlage des Bundesgesetzes über den Datenschutz (kurz „Schweizer DSG").
    Anders als beispielsweise die DSGVO sieht das Schweizer DSG grundsätzlich nicht vor, dass eine Rechtsgrundlage für
    die Bearbeitung der Personendaten genannt werden muss und die Bearbeitung von Personendaten nach Treu und Glauben
    durchgeführt wird, rechtmäßig und verhältnismäßig ist (Art. 6 Abs. 1 und 2 des Schweizer DSG). Zudem werden
    Personendaten von uns nur zu einem bestimmten, für die betroffene Person erkennbaren Zweck beschafft und nur so
    bearbeitet, wie es mit diesem Zweck vereinbar ist (Art. 6 Abs. 3 des Schweizer DSG).</p>
<p><strong>Hinweis auf Geltung DSGVO und Schweizer DSG: </strong>Diese Datenschutzhinweise dienen sowohl der
    Informationserteilung nach dem Schweizer DSG als auch nach der Datenschutzgrundverordnung (DSGVO). Aus diesem Grund
    bitten wir Sie zu beachten, dass aufgrund der breiteren räumlichen Anwendung und Verständlichkeit die Begriffe der
    DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG verwendeten Begriffe „Bearbeitung" von
    „Personendaten", "überwiegendes Interesse" und "besonders schützenswerte Personendaten" werden die in der DSGVO
    verwendeten Begriffe „Verarbeitung" von „personenbezogenen Daten" sowie "berechtigtes Interesse" und "besondere
    Kategorien von Daten" verwendet. Die gesetzliche Bedeutung der Begriffe wird jedoch im Rahmen der Geltung des
    Schweizer DSG weiterhin nach dem Schweizer DSG bestimmt.</p>

<h2 id="m27">Sicherheitsmaßnahmen</h2>
<p>Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der
    Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der
    unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher
    Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu
    gewährleisten.</p>
<p>Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch
    Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der
    Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren
    eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung
    der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung
    bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch
    Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.</p>

<h2 id="m25">Übermittlung von personenbezogenen Daten</h2>
<p>Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an andere Stellen, Unternehmen,
    rechtlich selbstständige Organisationseinheiten oder Personen übermittelt beziehungsweise ihnen gegenüber
    offengelegt werden. Zu den Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister gehören
    oder Anbieter von Diensten und Inhalten, die in eine Website eingebunden sind. In solchen Fällen beachten wir die
    gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer
    Daten dienen, mit den Empfängern Ihrer Daten ab.</p>

<h2 id="m24">Internationale Datentransfers</h2>
<p>Datenverarbeitung in Drittländern: Sofern wir Daten in ein Drittland (d. h. außerhalb der Europäischen Union (EU)
    oder des Europäischen Wirtschaftsraums (EWR)) übermitteln oder dies im Rahmen der Nutzung von Diensten Dritter oder
    der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen geschieht (was erkennbar
    wird anhand der Postadresse des jeweiligen Anbieters oder wenn in der Datenschutzerklärung ausdrücklich auf den
    Datentransfer in Drittländer hingewiesen wird), erfolgt dies stets im Einklang mit den gesetzlichen Vorgaben.</p>
<p>Für Datenübermittlungen in die USA stützen wir uns vorrangig auf das Data Privacy Framework (DPF), welches durch
    einen Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 als sicherer Rechtsrahmen anerkannt wurde.
    Zusätzlich haben wir mit den jeweiligen Anbietern Standardvertragsklauseln abgeschlossen, die den Vorgaben der
    EU-Kommission entsprechen und vertragliche Verpflichtungen zum Schutz Ihrer Daten festlegen.</p>
<p>Diese zweifache Absicherung gewährleistet einen umfassenden Schutz Ihrer Daten: Das DPF bildet die primäre
    Schutzebene, während die Standardvertragsklauseln als zusätzliche Sicherheit dienen. Sollten sich Änderungen im
    Rahmen des DPF ergeben, greifen die Standardvertragsklauseln als zuverlässige Rückfalloption ein. So stellen wir
    sicher, dass Ihre Daten auch bei etwaigen politischen oder rechtlichen Veränderungen stets angemessen geschützt
    bleiben.</p>
<p>Bei den einzelnen Diensteanbietern informieren wir Sie darüber, ob sie nach dem DPF zertifiziert sind und ob
    Standardvertragsklauseln vorliegen. Weitere Informationen zum DPF und eine Liste der zertifizierten Unternehmen
    finden Sie auf der Website des US-Handelsministeriums unter <a href="https://www.dataprivacyframework.gov/"
        target="_blank">https://www.dataprivacyframework.gov/</a> (in englischer Sprache).</p>
<p>Für Datenübermittlungen in andere Drittländer gelten entsprechende Sicherheitsmaßnahmen, insbesondere
    Standardvertragsklauseln, ausdrückliche Einwilligungen oder gesetzlich erforderliche Übermittlungen. Informationen
    zu Drittlandtransfers und geltenden Angemessenheitsbeschlüssen können Sie dem Informationsangebot der EU-Kommission
    entnehmen: <a
        href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de"
        target="_blank">https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de.</a>
</p>
<p>Bekanntgabe von Personendaten ins Ausland: Gemäß dem Schweizer DSG geben wir personenbezogene Daten nur dann ins
    Ausland bekannt, wenn ein angemessener Schutz der betroffenen Personen gewährleistet ist (Art. 16 Schweizer DSG).
    Sofern der Bundesrat keinen angemessenen Schutz festgestellt hat (Liste: <a
        href="https://www.bj.admin.ch/bj/de/home/staat/datenschutz/internationales/anerkennung-staaten.html"
        target="_blank">https://www.bj.admin.ch/bj/de/home/staat/datenschutz/internationales/anerkennung-staaten.html</a>),
    ergreifen wir alternative Sicherheitsmaßnahmen.</p>
<p>Für Datenübermittlungen in die USA stützen wir uns vorrangig auf das Data Privacy Framework (DPF), welches durch
    einen Angemessenheitsbeschluss der Schweiz vom 07.06.2024 als sicherer Rechtsrahmen anerkannt wurde. Zusätzlich
    haben wir mit den jeweiligen Anbietern Standarddatenschutzklauseln abgeschlossen, die von der Eidgenössischen
    Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) genehmigt wurden und vertragliche Verpflichtungen zum Schutz
    Ihrer Daten festlegen.</p>
<p>Diese zweifache Absicherung gewährleistet einen umfassenden Schutz Ihrer Daten: Das DPF bildet die primäre
    Schutzebene, während die Standarddatenschutzklauseln als zusätzliche Sicherheit dienen. Sollten sich Änderungen im
    Rahmen des DPF ergeben, greifen die Standarddatenschutzklauseln als zuverlässige Rückfalloption ein. So stellen wir
    sicher, dass Ihre Daten auch bei etwaigen politischen oder rechtlichen Veränderungen stets angemessen geschützt
    bleiben.</p>
<p>Bei den einzelnen Diensteanbietern informieren wir Sie darüber, ob sie nach dem DPF zertifiziert sind und ob
    Standarddatenschutzklauseln vorliegen. Die Liste der zertifizierten Unternehmen sowie weitere Informationen zum DPF
    finden Sie auf der Website des US-Handelsministeriums unter <a href="https://www.dataprivacyframework.gov/"
        target="_blank">https://www.dataprivacyframework.gov/</a> (in englischer Sprache).</p>
<p>Für Datenübermittlungen in andere Drittländer gelten entsprechende Sicherheitsmaßnahmen, einschließlich
    internationaler Verträge, spezifischer Garantien, von der EDÖB genehmigter Standarddatenschutzklauseln oder von der
    EDÖB oder einer zuständigen Datenschutzbehörde eines anderen Landes vorab anerkannter unternehmensinterner
    Datenschutzvorschriften.</p>

<h2 id="m12">Allgemeine Informationen zur Datenspeicherung und Löschung</h2>
<p>Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen Bestimmungen, sobald die
    zugrundeliegenden Einwilligungen widerrufen werden oder keine weiteren rechtlichen Grundlagen für die Verarbeitung
    bestehen. Dies betrifft Fälle, in denen der ursprüngliche Verarbeitungszweck entfällt oder die Daten nicht mehr
    benötigt werden. Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder besondere Interessen eine
    längere Aufbewahrung oder Archivierung der Daten erfordern.</p>
<p>Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren
    Speicherung notwendig ist zur Rechtsverfolgung oder zum Schutz der Rechte anderer natürlicher oder juristischer
    Personen, entsprechend archiviert werden.</p>
<p>Unsere Datenschutzhinweise enthalten zusätzliche Informationen zur Aufbewahrung und Löschung von Daten, die speziell
    für bestimmte Verarbeitungsprozesse gelten.</p>
<p>Bei mehreren Angaben zur Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist stets die längste Frist
    maßgeblich.</p>
<p>Beginnt eine Frist nicht ausdrücklich zu einem bestimmten Datum und beträgt sie mindestens ein Jahr, so startet sie
    automatisch am Ende des Kalenderjahres, in dem das fristauslösende Ereignis eingetreten ist. Im Fall laufender
    Vertragsverhältnisse, in deren Rahmen Daten gespeichert werden, ist das fristauslösende Ereignis der Zeitpunkt des
    Wirksamwerdens der Kündigung oder sonstige Beendigung des Rechtsverhältnisses.</p>
<p>Daten, die nicht mehr für den ursprünglich vorgesehenen Zweck, sondern aufgrund gesetzlicher Vorgaben oder anderer
    Gründe aufbewahrt werden, verarbeiten wir ausschließlich zu den Gründen, die ihre Aufbewahrung rechtfertigen.</p>
<p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
<ul class="m-elements">
    <li><strong>Aufbewahrung und Löschung von Daten: </strong>Die folgenden allgemeinen Fristen gelten für die
        Aufbewahrung und Archivierung nach deutschem Recht:<ul>
            <li>10 Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte,
                Eröffnungsbilanz sowie die zu ihrem Verständnis erforderlichen Arbeitsanweisungen und sonstigen
                Organisationsunterlagen (§ 147 Abs. 1 Nr. 1 i.V.m. Abs. 3 AO, § 14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1
                i.V.m. Abs. 4 HGB).</li>
            <li>8 Jahre - Buchungsbelege, wie z. B. Rechnungen und Kostenbelege (§ 147 Abs. 1 Nr. 4 und 4a i.V.m. Abs. 3
                Satz 1 AO sowie § 257 Abs. 1 Nr. 4 i.V.m. Abs. 4 HGB).</li>
            <li>6 Jahre - Übrige Geschäftsunterlagen: empfangene Handels- oder Geschäftsbriefe, Wiedergaben der
                abgesandten Handels- oder Geschäftsbriefe, sonstige Unterlagen, soweit sie für die Besteuerung von
                Bedeutung sind, z. B. Stundenlohnzettel, Betriebsabrechnungsbögen, Kalkulationsunterlagen,
                Preisauszeichnungen, aber auch Lohnabrechnungsunterlagen, soweit sie nicht bereits Buchungsbelege sind
                und Kassenstreifen (§ 147 Abs. 1 Nr. 2, 3, 5 i.V.m. Abs. 3 AO, § 257 Abs. 1 Nr. 2 u. 3 i.V.m. Abs. 4
                HGB).</li>
            <li>3 Jahre - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und Schadensersatzansprüche oder
                ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen sowie damit verbundene Anfragen zu
                bearbeiten, basierend auf früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die
                Dauer der regulären gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 195, 199 BGB).</li>
        </ul>
    </li>
    <li><strong>Aufbewahrung und Löschung von Daten: </strong>Die folgenden allgemeinen Fristen gelten gemäß
        österreichischem Recht für die Aufbewahrung und Archivierung: <ul>
            <li>10 Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte,
                Eröffnungsbilanzen, Buchungsbelege und Rechnungen sowie alle erforderlichen Arbeitsanweisungen und
                sonstigen Organisationsunterlagen (Bundesabgabenordnung (BAO §132), Unternehmensgesetzbuch (UGB
                §§190-212)).</li>
            <li>6 Jahre - Sonstige Geschäftsunterlagen: Erhaltene Handels- oder Geschäftsbriefe, Kopien der versendeten
                Handels- oder Geschäftsbriefe und andere Unterlagen, sofern sie für die Steuer relevant sind. Dazu
                gehören beispielsweise Stundenlohnscheine, Betriebsabrechnungsbögen, Kalkulationsunterlagen,
                Preisauszeichnungen und Lohnabrechnungsunterlagen, sofern sie nicht bereits Buchungsbelege und
                Kassenstreifen sind (Bundesabgabenordnung (BAO §132), Unternehmensgesetzbuch (UGB §§190-212)).</li>
            <li>3 Jahre - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und Schadensersatzansprüche oder
                ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen sowie damit verbundene Anfragen zu
                bearbeiten, basierend auf früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die
                Dauer der regulären gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 1478, 1480 ABGB).</li>
        </ul>
    </li>
    <li><strong>Aufbewahrung und Löschung von Daten: </strong>Die folgenden allgemeinen Fristen gelten für die
        Aufbewahrung und Archivierung nach dem Schweizer Recht:<ul>
            <li>10 Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte,
                Eröffnungsbilanzen, Buchungsbelege und Rechnungen sowie alle erforderlichen Arbeitsanweisungen und
                sonstigen Organisationsunterlagen (Art. 958f des Schweizerischen Obligationenrechts (OR)).</li>
            <li>10 Jahre - Daten, die zur Berücksichtigung potenzieller Schadenersatzansprüche oder ähnlicher
                vertraglicher Ansprüche und Rechte notwendig sind, sowie für die Bearbeitung damit verbundener Anfragen,
                basierend auf früheren Geschäftserfahrungen und den üblichen Branchenpraktiken, werden für den Zeitraum
                der gesetzlichen Verjährungsfrist von zehn Jahren gespeichert, es sei denn, eine kürzere Frist von fünf
                Jahren ist maßgeblich, die in bestimmten Fällen einschlägig ist (Art. 127, 130 OR). Mit Ablauf von fünf
                Jahren verjähren die Forderungen für Miet-, Pacht- und Kapitalzinse sowie andere periodische Leistungen,
                aus Lieferung von Lebensmitteln, für Beköstigung und für Wirtsschulden, sowie aus Handwerksarbeit,
                Kleinverkauf von Waren, ärztlicher Besorgung, Berufsarbeiten von Anwälten, Rechtsagenten, Prokuratoren
                und Notaren und aus dem Arbeitsverhältnis von Arbeitnehmern (Art. 128 OR).</li>
        </ul>
    </li>
</ul>
<h2 id="m10">Rechte der betroffenen Personen</h2>
<p>Rechte der betroffenen Personen aus der DSGVO: Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die
    sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:</p>
<ul>
    <li><strong>Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
            jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs.
            1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen
            gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu
            betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden
            personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit
            es mit solcher Direktwerbung in Verbindung steht.</strong></li>
    <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu
        widerrufen.</li>
    <li><strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende
        Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten
        entsprechend den gesetzlichen Vorgaben.</li>
    <li><strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die
        Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu
        verlangen.</li>
    <li><strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der gesetzlichen
        Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach
        Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.</li>
    <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns
        bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und
        maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.</li>
    <li><strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen
        verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde,
        insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des
        mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen
        Daten gegen die Vorgaben der DSGVO verstößt.</li>
</ul>
<p>Rechte der betroffenen Personen nach dem Schweizer DSG: </p>
<p>Ihnen stehen als betroffene Person nach Maßgabe der Vorgaben des Schweizer DSG die folgenden Rechte zu:</p>
<ul>
    <li><strong>Recht auf Auskunft: </strong>Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob Sie
        betreffende Personendaten verarbeitet werden, und auf Erhalt derjenigen Informationen, die erforderlich sind,
        damit Sie Ihre Rechte nach diesem Gesetz geltend machen können und eine transparente Datenbearbeitung
        gewährleistet ist.</li>
    <li><strong>Recht auf Datenherausgabe oder -übertragung: </strong>Sie haben das Recht, die Herausgabe Ihrer
        Personendaten, die Sie uns bekanntgegeben haben, in einem gängigen elektronischen Format zu verlangen.</li>
    <li><strong>Recht auf Berichtigung:</strong> Sie haben das Recht, die Berichtigung der Sie betreffenden unrichtigen
        Personendaten zu verlangen.</li>
    <li><strong>Recht auf Widerspruch, Löschung und Vernichtung: </strong>Sie haben das Recht, der Verarbeitung Ihrer
        Daten zu widersprechen, sowie zu verlangen, dass die Sie betreffenden Personendaten gelöscht oder vernichtet
        werden.</li>
</ul>

<h2 id="m225">Bereitstellung des Onlineangebots und Webhosting</h2>
<p>Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu können. Zu diesem Zweck
    verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und Funktionen unserer Online-Dienste
    an den Browser oder das Endgerät der Nutzer zu übermitteln.</p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade,
        Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und
        Funktionen); Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
        beteiligte Personen). Protokolldaten (z. B. Logfiles betreffend Logins oder den Abruf von Daten oder
        Zugriffszeiten.).</li>
    <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
    <li><strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit;
        Informationstechnische Infrastruktur (Betrieb und Bereitstellung von Informationssystemen und technischen
        Geräten (Computer, Server etc.)). Sicherheitsmaßnahmen.</li>
    <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen
        zur Datenspeicherung und Löschung".</li>
    <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
</ul>
<p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
<ul class="m-elements">
    <li><strong>Erhebung von Zugriffsdaten und Logfiles: </strong>Der Zugriff auf unser Onlineangebot wird in Form von
        sogenannten "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die Adresse und der Name der
        abgerufenen Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über
        erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte
        Seite) und im Regelfall IP-Adressen und der anfragende Provider gehören. Die Serverlogfiles können zum einen zu
        Sicherheitszwecken eingesetzt werden, z. B. um eine Überlastung der Server zu vermeiden (insbesondere im Fall
        von missbräuchlichen Angriffen, sogenannten DDoS-Attacken), und zum anderen, um die Auslastung der Server und
        ihre Stabilität sicherzustellen; <span class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art.
            6 Abs. 1 S. 1 lit. f) DSGVO). </span><strong>Löschung von Daten:</strong> Logfile-Informationen werden für
        die Dauer von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren weitere
        Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der
        Löschung ausgenommen.</li>
</ul>
<h2 id="m134">Einsatz von Cookies</h2>
<p>Unter dem Begriff „Cookies" werden Funktionen, die Informationen auf Endgeräten der Nutzer speichern und aus ihnen
    auslesen, verstanden. Cookies können ferner in Bezug auf unterschiedliche Anliegen Einsatz finden, etwa zu Zwecken
    der Funktionsfähigkeit, der Sicherheit und des Komforts von Onlineangeboten sowie der Erstellung von Analysen der
    Besucherströme. Wir verwenden Cookies gemäß den gesetzlichen Vorschriften. Dazu holen wir, wenn erforderlich, vorab
    die Zustimmung der Nutzer ein. Ist eine Zustimmung nicht notwendig, setzen wir auf unsere berechtigten Interessen.
    Dies gilt, wenn das Speichern und Auslesen von Informationen unerlässlich ist, um ausdrücklich angeforderte Inhalte
    und Funktionen bereitstellen zu können. Dazu zählen etwa die Speicherung von Einstellungen sowie die Sicherstellung
    der Funktionalität und Sicherheit unseres Onlineangebots. Die Einwilligung kann jederzeit widerrufen werden. Wir
    informieren klar über deren Umfang und welche Cookies genutzt werden.</p>
<p><strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen: </strong>Ob wir personenbezogene Daten mithilfe von
    Cookies verarbeiten, hängt von einer Einwilligung ab. Liegt eine Einwilligung vor, dient sie als Rechtsgrundlage.
    Ohne Einwilligung stützen wir uns auf unsere berechtigten Interessen, die vorstehend in diesem Abschnitt und im
    Kontext der jeweiligen Dienste und Verfahren erläutert sind.</p>
<p><strong>Speicherdauer: </strong>Im Hinblick auf die Speicherdauer werden die folgenden Arten von Cookies
    unterschieden:</p>
<ul>
    <li><strong>Temporäre Cookies (auch: Session- oder Sitzungscookies):</strong> Temporäre Cookies werden spätestens
        gelöscht, nachdem ein Nutzer ein Onlineangebot verlassen und sein Endgerät (z. B. Browser oder mobile
        Applikation) geschlossen hat.</li>
    <li><strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem Schließen des Endgeräts
        gespeichert. So können beispielsweise der Log-in-Status gespeichert und bevorzugte Inhalte direkt angezeigt
        werden, wenn der Nutzer eine Website erneut besucht. Ebenso können die mithilfe von Cookies erhobenen
        Nutzerdaten zur Reichweitenmessung Verwendung finden. Sofern wir Nutzern keine expliziten Angaben zur Art und
        Speicherdauer von Cookies mitteilen (z. B. im Rahmen der Einholung der Einwilligung), sollten sie davon
        ausgehen, dass diese permanent sind und die Speicherdauer bis zu zwei Jahre betragen kann.</li>
</ul>
<p><strong>Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-out): </strong>Nutzer können die von ihnen abgegebenen
    Einwilligungen jederzeit widerrufen und zudem einen Widerspruch gegen die Verarbeitung entsprechend den gesetzlichen
    Vorgaben, auch mittels der Privatsphäre-Einstellungen ihres Browsers, erklären.</p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen,
        Zeitangaben, Identifikationsnummern, beteiligte Personen).</li>
    <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
    <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
</ul>
<h2 id="m104">Blogs und Publikationsmedien</h2>
<p>Wir nutzen Blogs oder vergleichbare Mittel der Onlinekommunikation und Publikation (nachfolgend
    "Publikationsmedium"). Die Daten der Leser werden für die Zwecke des Publikationsmediums nur insoweit verarbeitet,
    als es für dessen Darstellung und die Kommunikation zwischen Autoren und Lesern oder aus Gründen der Sicherheit
    erforderlich ist. Im Übrigen verweisen wir auf die Informationen zur Verarbeitung der Besucher unseres
    Publikationsmediums im Rahmen dieser Datenschutzhinweise.</p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z. B. der vollständige Name, Wohnadresse,
        Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z. B. Post- und E-Mail-Adressen oder Telefonnummern);
        Inhaltsdaten (z. B. textliche oder bildliche Nachrichten und Beiträge sowie die sie betreffenden Informationen,
        wie z. B. Angaben zur Autorenschaft oder Zeitpunkt der Erstellung); Nutzungsdaten (z. B. Seitenaufrufe und
        Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme,
        Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen,
        Zeitangaben, Identifikationsnummern, beteiligte Personen).</li>
    <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
    <li><strong>Zwecke der Verarbeitung:</strong> Feedback (z. B. Sammeln von Feedback via Online-Formular);
        Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit; Sicherheitsmaßnahmen. Organisations- und
        Verwaltungsverfahren.</li>
    <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen
        zur Datenspeicherung und Löschung".</li>
    <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
</ul>
<p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
<ul class="m-elements">
    <li><strong>Kommentare und Beiträge: </strong>Wenn Nutzer Kommentare oder sonstige Beiträge hinterlassen, können
        ihre IP-Adressen auf Grundlage unserer berechtigten Interessen gespeichert werden. Das erfolgt zu unserer
        Sicherheit, falls jemand in Kommentaren und Beiträgen widerrechtliche Inhalte hinterlässt (Beleidigungen,
        verbotene politische Propaganda etc.). In diesem Fall können wir selbst für den Kommentar oder Beitrag belangt
        werden und sind daher an der Identität des Verfassers interessiert.<br><br>Des Weiteren behalten wir uns vor,
        auf Grundlage unserer berechtigten Interessen die Angaben der Nutzer zwecks Spamerkennung zu
        verarbeiten.<br><br>Auf derselben Rechtsgrundlage behalten wir uns vor, im Fall von Umfragen die IP-Adressen der
        Nutzer für deren Dauer zu speichern und Cookies zu verwenden, um Mehrfachabstimmungen zu vermeiden.<br><br>Die
        im Rahmen der Kommentare und Beiträge mitgeteilten Informationen zur Person, etwaige Kontakt- sowie
        Webseiteninformationen als auch die inhaltlichen Angaben werden von uns bis zum Widerspruch der Nutzer dauerhaft
        gespeichert; <span class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit.
            f) DSGVO).</span></li>
</ul>
<h2 id="m182">Kontakt- und Anfrageverwaltung</h2>
<p>Bei der Kontaktaufnahme mit uns (z. B. per Post, Kontaktformular, E-Mail, Telefon oder via soziale Medien) sowie im
    Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben der anfragenden Personen verarbeitet, soweit
    dies zur Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.</p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z. B. der vollständige Name, Wohnadresse,
        Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z. B. Post- und E-Mail-Adressen oder Telefonnummern);
        Inhaltsdaten (z. B. textliche oder bildliche Nachrichten und Beiträge sowie die sie betreffenden Informationen,
        wie z. B. Angaben zur Autorenschaft oder Zeitpunkt der Erstellung); Nutzungsdaten (z. B. Seitenaufrufe und
        Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme,
        Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen,
        Zeitangaben, Identifikationsnummern, beteiligte Personen).</li>
    <li><strong>Betroffene Personen:</strong> Kommunikationspartner.</li>
    <li><strong>Zwecke der Verarbeitung:</strong> Kommunikation; Organisations- und Verwaltungsverfahren; Feedback
        (z. B. Sammeln von Feedback via Online-Formular). Bereitstellung unseres Onlineangebotes und
        Nutzerfreundlichkeit.</li>
    <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen
        zur Datenspeicherung und Löschung".</li>
    <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
        Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).</li>
</ul>
<p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
<ul class="m-elements">
    <li><strong>Kontaktformular: </strong>Bei Kontaktaufnahme über unser Kontaktformular, per E-Mail oder anderen
        Kommunikationswegen, verarbeiten wir die uns übermittelten personenbezogenen Daten zur Beantwortung und
        Bearbeitung des jeweiligen Anliegens. Dies umfasst in der Regel Angaben wie Name, Kontaktinformationen und
        gegebenenfalls weitere Informationen, die uns mitgeteilt werden und zur angemessenen Bearbeitung erforderlich
        sind. Wir nutzen diese Daten ausschließlich für den angegebenen Zweck der Kontaktaufnahme und Kommunikation;
        <span class=""><strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
            S. 1 lit. b) DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</span>
    </li>
</ul>
<h2 id="m263">Webanalyse, Monitoring und Optimierung</h2>
<p>Die Webanalyse (auch als „Reichweitenmessung" bezeichnet) dient der Auswertung der Besucherströme unseres
    Onlineangebots und kann Verhalten, Interessen oder demografische Informationen zu den Besuchern, wie beispielsweise
    Alter oder Geschlecht, als pseudonyme Werte umfassen. Mithilfe der Reichweitenanalyse können wir zum Beispiel
    erkennen, zu welcher Zeit unser Onlineangebot oder dessen Funktionen beziehungsweise Inhalte am häufigsten genutzt
    werden, oder zur Wiederverwendung einladen. Ebenso ist es uns möglich, nachzuvollziehen, welche Bereiche der
    Optimierung bedürfen. </p>
<p>Neben der Webanalyse können wir auch Testverfahren einsetzen, um etwa unterschiedliche Versionen unseres
    Onlineangebots oder seiner Bestandteile zu testen und zu optimieren.</p>
<p>Sofern nachfolgend nicht anders angegeben, können zu diesen Zwecken Profile, also zu einem Nutzungsvorgang
    zusammengefasste Daten, angelegt und Informationen in einem Browser bzw. in einem Endgerät gespeichert und dann
    ausgelesen werden. Zu den erhobenen Angaben gehören insbesondere besuchte Websites und dort genutzte Elemente sowie
    technische Auskünfte, wie etwa der verwendete Browser, das benutzte Computersystem sowie Angaben zu Nutzungszeiten.
    Sofern sich Nutzer in die Erhebung ihrer Standortdaten uns gegenüber oder gegenüber den Anbietern der von uns
    eingesetzten Dienste einverstanden erklärt haben, ist auch die Verarbeitung von Standortdaten möglich.</p>
<p>Darüber hinaus werden die IP-Adressen der Nutzer gespeichert. Jedoch nutzen wir ein IP-Masking-Verfahren (d. h.
    Pseudonymisierung durch Kürzung der IP-Adresse) zum Schutz der Nutzer. Generell werden die im Rahmen von Webanalyse,
    A/B-Testings und Optimierung keine Klardaten der Nutzer (wie z. B. E-Mail-Adressen oder Namen) gespeichert, sondern
    Pseudonyme. Das heißt, wir als auch die Anbieter der eingesetzten Software kennen nicht die tatsächliche Identität
    der Nutzer, sondern nur die zum Zweck der jeweiligen Verfahren in deren Profilen gespeicherten Angaben.</p>
<p>Hinweise zu Rechtsgrundlagen: Sofern wir die Nutzer um deren Einwilligung in den Einsatz der Drittanbieter bitten,
    stellt die Rechtsgrundlage der Datenverarbeitung die Einwilligung dar. Ansonsten werden die Nutzerdaten auf
    Grundlage unserer berechtigten Interessen (d. h. Interesse an effizienten, wirtschaftlichen und
    empfängerfreundlichen Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die Informationen zur
    Verwendung von Cookies in dieser Datenschutzerklärung hinweisen.</p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade,
        Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und
        Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
        beteiligte Personen).</li>
    <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
    <li><strong>Zwecke der Verarbeitung:</strong> Reichweitenmessung (z. B. Zugriffsstatistiken, Erkennung
        wiederkehrender Besucher). Profile mit nutzerbezogenen Informationen (Erstellen von Nutzerprofilen).</li>
    <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen
        zur Datenspeicherung und Löschung". Speicherung von Cookies von bis zu 2 Jahren (Sofern nicht anders angegeben,
        können Cookies und ähnliche Speichermethoden für einen Zeitraum von zwei Jahren auf den Geräten der Nutzer
        gespeichert werden.).</li>
    <li><strong>Sicherheitsmaßnahmen:</strong> IP-Masking (Pseudonymisierung der IP-Adresse).</li>
    <li class=""><strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Berechtigte
        Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
</ul>
<h2 id="m264">Onlinemarketing</h2>
<p>Wir verarbeiten personenbezogene Daten zum Zweck des Onlinemarketings, worunter insbesondere die Vermarktung von
    Werbeflächen oder die Darstellung von werbenden und sonstigen Inhalten (zusammenfassend als „Inhalte" bezeichnet)
    anhand potenzieller Interessen der Nutzer sowie die Messung ihrer Effektivität fallen können.</p>
<p>Zu diesen Zwecken werden sogenannte Nutzerprofile angelegt und in einer Datei (der sogenannte „Cookie") gespeichert
    oder ähnliche Verfahren genutzt, mittels derer die für die Darstellung der vorgenannten Inhalte relevanten Angaben
    zum Nutzer gespeichert werden. Hierzu können beispielsweise betrachtete Inhalte, besuchte Websites, genutzte
    Onlinenetzwerke, aber auch Kommunikationspartner und technische Angaben gehören, wie etwa der verwendete Browser,
    das benutzte Computersystem sowie Auskünfte zu Nutzungszeiten und genutzten Funktionen. Sofern Nutzer in die
    Erhebung ihrer Standortdaten eingewilligt haben, können auch diese verarbeitet werden.</p>
<p>Zudem werden die IP-Adressen der Nutzer gespeichert. Jedoch nutzen wir zur Verfügung stehende IP-Masking-Verfahren
    (d. h. Pseudonymisierung durch Kürzung der IP-Adresse) zum Nutzerschutz. Generell werden im Rahmen des
    Onlinemarketingverfahrens keine Klardaten der Nutzer (wie z. B. E-Mail-Adressen oder Namen) gespeichert, sondern
    Pseudonyme. Das heißt, wir als auch die Anbieter der Onlinemarketingverfahren kennen nicht die tatsächliche
    Nutzeridentität, sondern nur die in deren Profilen gespeicherten Angaben.</p>
<p>Die Aussagen in den Profilen werden im Regelfall in den Cookies oder mittels ähnlicher Verfahren gespeichert. Diese
    Cookies können später generell auch auf anderen Websites, die dasselbe Onlinemarketingverfahren einsetzen,
    ausgelesen und zum Zweck der Darstellung von Inhalten analysiert sowie mit weiteren Daten ergänzt und auf dem Server
    des Onlinemarketingverfahrensanbieters gespeichert werden.</p>
<p>Ausnahmsweise ist es möglich, Klardaten den Profilen zuzuordnen, vornehmlich dann, wenn die Nutzer zum Beispiel
    Mitglieder eines sozialen Netzwerks sind, dessen Onlinemarketingverfahren wir einsetzen und das Netzwerk die
    Nutzerprofile mit den vorgenannten Angaben verbindet. Wir bitten darum, zu beachten, dass Nutzer mit den Anbietern
    zusätzliche Abreden treffen können, etwa durch Einwilligung im Rahmen der Registrierung.</p>
<p>Wir erhalten grundsätzlich nur Zugang zu zusammengefassten Informationen über den Erfolg unserer Werbeanzeigen.
    Jedoch können wir im Rahmen sogenannter Konversionsmessungen prüfen, welche unserer Onlinemarketingverfahren zu
    einer sogenannten Konversion geführt haben, d. h. beispielsweise zu einem Vertragsschluss mit uns. Die
    Konversionsmessung wird alleine zur Erfolgsanalyse unserer Marketingmaßnahmen verwendet.</p>
<p>Solange nicht anders angegeben, bitten wir Sie, davon auszugehen, dass eingesetzte Cookies für einen Zeitraum von
    zwei Jahren gespeichert werden.</p>
<p><strong>Hinweise zu Rechtsgrundlagen:</strong> Sofern wir die Nutzer um deren Einwilligung in den Einsatz der
    Drittanbieter bitten, stellt die Rechtsgrundlage der Datenverarbeitung die Erlaubnis dar. Ansonsten werden die Daten
    der Nutzer auf Grundlage unserer berechtigten Interessen (d. h. Interesse an effizienten, wirtschaftlichen und
    empfängerfreundlichen Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die Informationen zur
    Verwendung von Cookies in dieser Datenschutzerklärung hinweisen.</p>
<p><strong>Hinweise zum Widerruf und Widerspruch:</strong> </p>
<p>Wir verweisen auf die Datenschutzhinweise der jeweiligen Anbieter und die zu den Anbietern angegebenen
    Widerspruchsmöglichkeiten (sog. "Opt-Out"). Sofern keine explizite Opt-Out-Möglichkeit angegeben wurde, besteht zum
    einen die Möglichkeit, dass Sie Cookies in den Einstellungen Ihres Browsers abschalten. Hierdurch können jedoch
    Funktionen unseres Onlineangebotes eingeschränkt werden. Wir empfehlen daher zusätzlich die folgenden
    Opt-Out-Möglichkeiten, die zusammenfassend auf jeweilige Gebiete gerichtet angeboten werden: </p>
<p>a) Europa: <a href="https://www.youronlinechoices.eu" target="_blank">https://www.youronlinechoices.eu.</a> </p>
<p>b) Kanada: <a href="https://www.youradchoices.ca/choices" target="_blank">https://www.youradchoices.ca/choices.</a>
</p>
<p>c) USA: <a href="https://www.aboutads.info/choices" target="_blank">https://www.aboutads.info/choices.</a> </p>
<p>d) Gebietsübergreifend: <a href="https://optout.aboutads.info" target="_blank">https://optout.aboutads.info.</a></p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade,
        Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und
        Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
        beteiligte Personen).</li>
    <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
    <li><strong>Zwecke der Verarbeitung:</strong> Reichweitenmessung (z. B. Zugriffsstatistiken, Erkennung
        wiederkehrender Besucher); Tracking (z. B. interessens-/verhaltensbezogenes Profiling, Nutzung von Cookies);
        Zielgruppenbildung; Marketing. Profile mit nutzerbezogenen Informationen (Erstellen von Nutzerprofilen).</li>
    <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen
        zur Datenspeicherung und Löschung". Speicherung von Cookies von bis zu 2 Jahren (Sofern nicht anders angegeben,
        können Cookies und ähnliche Speichermethoden für einen Zeitraum von zwei Jahren auf den Geräten der Nutzer
        gespeichert werden.).</li>
    <li><strong>Sicherheitsmaßnahmen:</strong> IP-Masking (Pseudonymisierung der IP-Adresse).</li>
</ul>
<h2 id="m136">Präsenzen in sozialen Netzwerken (Social Media)</h2>
<p>Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und verarbeiten in diesem Rahmen Nutzerdaten, um mit den
    dort aktiven Nutzern zu kommunizieren oder Informationen über uns anzubieten.</p>
<p>Wir weisen darauf hin, dass dabei Nutzerdaten außerhalb des Raumes der Europäischen Union verarbeitet werden können.
    Hierdurch können sich für die Nutzer Risiken ergeben, weil so zum Beispiel die Durchsetzung der Nutzerrechte
    erschwert werden könnte.</p>
<p>Ferner werden die Daten der Nutzer innerhalb sozialer Netzwerke im Regelfall für Marktforschungs- und Werbezwecke
    verarbeitet. So können beispielsweise anhand des Nutzungsverhaltens und sich daraus ergebender Interessen der Nutzer
    Nutzungsprofile erstellt werden. Letztere finden möglicherweise wiederum Verwendung, um etwa Werbeanzeigen innerhalb
    und außerhalb der Netzwerke zu schalten, die mutmaßlich den Interessen der Nutzer entsprechen. Daher werden im
    Regelfall Cookies auf den Rechnern der Nutzer gespeichert, in denen das Nutzungsverhalten und die Interessen der
    Nutzer gespeichert werden. Zudem können in den Nutzungsprofilen auch Daten unabhängig der von den Nutzern
    verwendeten Geräten gespeichert werden (insbesondere, wenn sie Mitglieder der jeweiligen Plattformen und dort
    eingeloggt sind).</p>
<p>Für eine detaillierte Darstellung der jeweiligen Verarbeitungsformen und der Widerspruchsmöglichkeiten (Opt-out)
    verweisen wir auf die Datenschutzerklärungen und Angaben der Betreiber der jeweiligen Netzwerke.</p>
<p>Auch im Fall von Auskunftsanfragen und der Geltendmachung von Betroffenenrechten weisen wir darauf hin, dass diese am
    effektivsten bei den Anbietern geltend gemacht werden können. Nur Letztere haben jeweils Zugriff auf die Nutzerdaten
    und können direkt entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie dennoch Hilfe benötigen, dann
    können Sie sich an uns wenden.</p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z. B. Post- und E-Mail-Adressen oder Telefonnummern);
        Inhaltsdaten (z. B. textliche oder bildliche Nachrichten und Beiträge sowie die sie betreffenden Informationen,
        wie z. B. Angaben zur Autorenschaft oder Zeitpunkt der Erstellung). Nutzungsdaten (z. B. Seitenaufrufe und
        Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme,
        Interaktionen mit Inhalten und Funktionen).</li>
    <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
    <li><strong>Zwecke der Verarbeitung:</strong> Kommunikation; Feedback (z. B. Sammeln von Feedback via
        Online-Formular). Öffentlichkeitsarbeit.</li>
    <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen
        zur Datenspeicherung und Löschung".</li>
    <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
</ul>
<h2 id="m328">Plug-ins und eingebettete Funktionen sowie Inhalte</h2>
<p>Wir binden Funktions- und Inhaltselemente in unser Onlineangebot ein, die von den Servern ihrer jeweiligen Anbieter
    (nachfolgend als „Drittanbieter" bezeichnet) bezogen werden. Dabei kann es sich zum Beispiel um Grafiken, Videos
    oder Stadtpläne handeln (nachfolgend einheitlich als „Inhalte" bezeichnet).</p>
<p>Die Einbindung setzt immer voraus, dass die Drittanbieter dieser Inhalte die IP-Adresse der Nutzer verarbeiten, da
    sie ohne IP-Adresse die Inhalte nicht an deren Browser senden könnten. Die IP-Adresse ist damit für die Darstellung
    dieser Inhalte oder Funktionen erforderlich. Wir bemühen uns, nur solche Inhalte zu verwenden, deren jeweilige
    Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte anzuwenden. Drittanbieter können ferner sogenannte
    Pixel-Tags (unsichtbare Grafiken, auch als „Web Beacons" bezeichnet) für statistische oder Marketingzwecke
    einsetzen. Durch die „Pixel-Tags" können Informationen, wie etwa der Besucherverkehr auf den Seiten dieser Website,
    ausgewertet werden. Die pseudonymen Informationen können darüber hinaus in Cookies auf dem Gerät der Nutzer
    gespeichert werden und unter anderem technische Auskünfte zum Browser und zum Betriebssystem, zu verweisenden
    Websites, zur Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebots enthalten, aber auch mit solchen
    Informationen aus anderen Quellen verbunden werden.</p>
<p><strong>Hinweise zu Rechtsgrundlagen:</strong> Sofern wir die Nutzer um ihre Einwilligung in den Einsatz der
    Drittanbieter bitten, stellt die Rechtsgrundlage der Datenverarbeitung die Erlaubnis dar. Ansonsten werden die
    Nutzerdaten auf Grundlage unserer berechtigten Interessen (d. h. Interesse an effizienten, wirtschaftlichen und
    empfängerfreundlichen Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die Informationen zur
    Verwendung von Cookies in dieser Datenschutzerklärung hinweisen.</p>
<ul class="m-elements">
    <li><strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade,
        Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und
        Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
        beteiligte Personen).</li>
    <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
    <li><strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
    <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen
        zur Datenspeicherung und Löschung". Speicherung von Cookies von bis zu 2 Jahren (Sofern nicht anders angegeben,
        können Cookies und ähnliche Speichermethoden für einen Zeitraum von zwei Jahren auf den Geräten der Nutzer
        gespeichert werden.).</li>
    <li class=""><strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Berechtigte
        Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
</ul>
<p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
<ul class="m-elements">
    <li><strong>Google Fonts (Bezug vom Google Server): </strong>Bezug von Schriften (und Symbolen) zum Zwecke einer
        technisch sicheren, wartungsfreien und effizienten Nutzung von Schriften und Symbolen im Hinblick auf Aktualität
        und Ladezeiten, deren einheitliche Darstellung und Berücksichtigung möglicher lizenzrechtlicher Beschränkungen.
        Dem Anbieter der Schriftarten wird die IP-Adresse des Nutzers mitgeteilt, damit die Schriftarten im Browser des
        Nutzers zur Verfügung gestellt werden können. Darüber hinaus werden technische Daten (Spracheinstellungen,
        Bildschirmauflösung, Betriebssystem, verwendete Hardware) übermittelt, die für die Bereitstellung der Schriften
        in Abhängigkeit von den verwendeten Geräten und der technischen Umgebung notwendig sind. Diese Daten können auf
        einem Server des Anbieters der Schriftarten in den USA verarbeitet werden - Beim Besuch unseres Onlineangebotes
        senden die Browser der Nutzer ihre Browser HTTP-Anfragen an die Google Fonts Web API (d. h. eine
        Softwareschnittstelle für den Abruf der Schriftarten). Die Google Fonts Web API stellt den Nutzern die Cascading
        Style Sheets (CSS) von Google Fonts und danach die in der CCS angegebenen Schriftarten zur Verfügung. Zu diesen
        HTTP-Anfragen gehören (1) die vom jeweiligen Nutzer für den Zugriff auf das Internet verwendete IP-Adresse, (2)
        die angeforderte URL auf dem Google-Server und (3) die HTTP-Header, einschließlich des User-Agents, der die
        Browser- und Betriebssystemversionen der Websitebesucher beschreibt, sowie die Verweis-URL (d. h. die Webseite,
        auf der die Google-Schriftart angezeigt werden soll). IP-Adressen werden weder auf Google-Servern protokolliert
        noch gespeichert und sie werden nicht analysiert. Die Google Fonts Web API protokolliert Details der
        HTTP-Anfragen (angeforderte URL, User-Agent und Verweis-URL). Der Zugriff auf diese Daten ist eingeschränkt und
        streng kontrolliert. Die angeforderte URL identifiziert die Schriftfamilien, für die der Nutzer Schriftarten
        laden möchte. Diese Daten werden protokolliert, damit Google bestimmen kann, wie oft eine bestimmte
        Schriftfamilie angefordert wird. Bei der Google Fonts Web API muss der User-Agent die Schriftart anpassen, die
        für den jeweiligen Browsertyp generiert wird. Der User-Agent wird in erster Linie zum Debugging protokolliert
        und verwendet, um aggregierte Nutzungsstatistiken zu generieren, mit denen die Beliebtheit von Schriftfamilien
        gemessen wird. Diese zusammengefassten Nutzungsstatistiken werden auf der Seite „Analysen" von Google Fonts
        veröffentlicht. Schließlich wird die Verweis-URL protokolliert, sodass die Daten für die Wartung der Produktion
        verwendet und ein aggregierter Bericht zu den Top-Integrationen basierend auf der Anzahl der
        Schriftartenanfragen generiert werden kann. Google verwendet laut eigener Auskunft keine der von Google Fonts
        erfassten Informationen, um Profile von Endnutzern zu erstellen oder zielgerichtete Anzeigen zu schalten;
        <strong>Dienstanbieter:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland; <span
            class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO);
        </span><strong>Website:</strong> <a href="https://fonts.google.com/"
            target="_blank">https://fonts.google.com/</a>; <strong>Datenschutzerklärung:</strong> <a
            href="https://policies.google.com/privacy" target="_blank">https://policies.google.com/privacy</a>;
        <strong>Grundlage Drittlandtransfers:</strong> EU/EWR - Data Privacy Framework (DPF), Schweiz - Data Privacy
        Framework (DPF). <strong>Weitere Informationen:</strong> <a
            href="https://developers.google.com/fonts/faq/privacy?hl=de"
            target="_blank">https://developers.google.com/fonts/faq/privacy?hl=de</a>.
    </li>
</ul>
<p class="seal"><a href="https://datenschutz-generator.de/"
        title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken." target="_blank"
        rel="noopener noreferrer nofollow">Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke</a>
</p>`;

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered onEsc={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent bg="gray.900" color="white" margin="25px" boxShadow="0 0 10px 0 rgba(24, 24, 24, 0.5)" maxWidth="calc(100vw - 50px)">
                <ModalHeader>Datenschutzerklärung</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box
                        dangerouslySetInnerHTML={{ __html: datenschutzHtmlContent }}
                        sx={{
                            h1: { fontSize: '2xl', fontWeight: 'bold', mb: 4, mt: 2 },
                            h2: { fontSize: 'xl', fontWeight: 'bold', mb: 3, mt: 5 },
                            h3: { fontSize: 'lg', fontWeight: 'bold', mb: 2, mt: 4 },
                            p: { mb: 3, lineHeight: 'tall' },
                            ul: { ml: 6, mb: 3 },
                            li: { mb: 1 },
                            a: { color: 'blue.500', _hover: { textDecoration: 'underline' } }, // Added hover state for links
                            strong: { fontWeight: 'semibold' },
                            br: { display: 'block', content: '""', mt: 1 } // Handle <br> for spacing
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Schließen</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
} 