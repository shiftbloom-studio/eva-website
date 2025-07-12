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

interface LegalNoticeModalProps {
    isOpen: boolean
    onClose: () => void
}

const legalHtmlContent = `
<p><strong>Stand: 12. Juli 2025</strong></p>
<h2>Allgemeine Urheberrechts- und Markenhinweise</h2>
<p>Alle auf dieser Website veröffentlichten Inhalte (Texte, Bilder, Grafiken, Sounds, Videos, Quellcode u. a.) unterliegen – sofern nicht anders kenntlich gemacht – unserem Urheberrecht oder dem Urheberrecht Dritter. Jede Form der Verwertung ausserhalb der Schranken des geltenden Urheberrechtsgesetzes bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.</p>
<h3>Eigene Inhalte</h3>
<p>Die von uns erstellten Texte, Bilder, Logos und sonstigen Medien dürfen ohne unsere ausdrückliche Erlaubnis weder kopiert, bearbeitet noch verbreitet werden. Ausnahmen hiervon erfordern eine explizite Lizenzvereinbarung.</p>
<h3>Inhalte Dritter</h3>
<p>Alle innerhalb des Internetangebots genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der blossen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind.</p>
<h2>Spezifischer Hinweis zu „Der Herr der Ringe“ & Tolkien-Universum</h2>
<p>„Der Herr der Ringe“, „Middle-earth“, „Der Hobbit“ sowie sämtliche zugehörigen Namen, Orte, Ereignisse und Charaktere sind eingetragene Marken der <em>Middle-earth Enterprises</em> beziehungsweise weiterer Rechteinhaber (u. a. Tolkien Estate, Warner Bros. Discovery, New Line Cinema).</p>
<ul>
  <li>Dieses Projekt steht <strong>in keinem rechtlichen, kommerziellen oder organisatorischen Zusammenhang</strong> mit den genannten Rechteinhabern.</li>
  <li>Es werden keinerlei offizielle oder inoffizielle Fan-Artikel, Merchandising-Produkte, Spiel-Assets oder digitale Güter angeboten, die unter die Lizenzrechte der Rechteinhaber fallen könnten.</li>
  <li>Sämtliche Verweise auf das Tolkien-Universum dienen ausschliesslich der Illustration eines nicht-kommerziellen Fan-Konzepts. Bei Beanstandungen werden betroffene Inhalte umgehend entfernt.</li>
</ul>
<h2>Open-Source & Drittbibliotheken</h2>
<p>Diese Website nutzt verschiedene Open-Source-Bibliotheken und Frameworks (u. a. Next.js, Chakra UI). Die entsprechenden Lizenzen sind in der <code>package.json</code> sowie gegebenenfalls in separaten Lizenzdateien aufgeführt.</p>
<h2>Bild- und Mediennachweise</h2>
<p>Verwendete Stock-Fotos, Icons oder Audio-Clips stammen – sofern nicht selbst erstellt – von nachstehenden Quellen und werden gemäss den jeweiligen Lizenzbedingungen genutzt:</p>
<ul>
  <li>Unsplash (<a href="https://unsplash.com/license" target="_blank">Unsplash Lizenz</a>)</li>
  <li>OpenGameArt (<a href="https://opengameart.org/content/terms-of-use" target="_blank">OGA Lizenz</a>)</li>
</ul>
<p>Sollten Sie dennoch eine Urheberrechtsverletzung feststellen, bitten wir um einen entsprechenden Hinweis. Wir werden derartige Inhalte umgehend entfernen oder nachlizenzieren.</p>
`;

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered onEsc={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent bg="gray.900" color="white" margin="25px" boxShadow="0 0 10px 0 rgba(24, 24, 24, 0.5)" maxWidth="calc(100vw - 50px)">
                <ModalHeader>Urheber- & Markenhinweise</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box dangerouslySetInnerHTML={{ __html: legalHtmlContent }} sx={{
                        h1: { fontSize: '2xl', fontWeight: 'bold', mb: 4, mt: 2 },
                        h2: { fontSize: 'xl', fontWeight: 'bold', mb: 3, mt: 5 },
                        h3: { fontSize: 'lg', fontWeight: 'bold', mb: 2, mt: 4 },
                        p: { mb: 3, lineHeight: 'tall' },
                        ul: { ml: 6, mb: 3 },
                        li: { mb: 1 },
                        a: { color: 'blue.400', _hover: { textDecoration: 'underline' } },
                        code: { bg: 'gray.700', px: 1, rounded: 'sm' },
                        strong: { fontWeight: 'semibold' }
                    }} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Schließen</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 