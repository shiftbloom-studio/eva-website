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

interface HaftungModalProps {
    isOpen: boolean
    onClose: () => void
}

// HTML-Inhalt des Haftungsausschlusses.
// Hier bewusst als Template-String ausgelagert, um die Lesbarkeit des JSX zu erhöhen.
const haftungHtmlContent = `
<p><strong>Stand: 12. Juli 2025</strong></p>

<h2>Website-Haftungsausschluss</h2>
<p>Die Informationen auf dieser Website werden von uns mit größtmöglicher Sorgfalt bereitgestellt. Dennoch übernehmen wir keinerlei Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr des Nutzers. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer unsere Meinung wieder.</p>

<h3>Haftung für Inhalte</h3>
<p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

<h3>Haftung für Links</h3>
<p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

<h3>Urheberrecht</h3>
<p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>

<h2>Markenrechtlicher Hinweis zu "Der Herr der Ringe"</h2>
<p>"Der Herr der Ringe", „Middle-earth", alle zugehörigen Namen, Orte, Ereignisse und Charaktere sind eingetragene Marken von Middle-earth Enterprises bzw. ihrer jeweiligen Rechteinhaber. Diese Website und das Projekt „Erbe von Arda" stehen in <strong>keinerlei</strong> geschäftlicher, rechtlicher oder sonstiger Verbindung zu Middle-earth Enterprises, der Tolkien Estate, Warner Bros. Discovery, New Line Cinema oder sonstigen Lizenzinhabern.</p>
<p>Es werden <strong>keine</strong> Produkte, Fan-Artikel, Dienstleistungen oder anderweitige Angebote verkauft oder beworben, die in irgendeiner Weise offiziell mit dem Marken- und Lizenzportfolio von „Der Herr der Ringe" oder „Der Hobbit" verbunden sind. Sämtliche Verweise auf das literarische Werk J. R. R. Tolkiens oder dessen filmische Interpretationen dienen ausschließlich der inhaltlichen Einordnung und erfolgen unter Anerkennung der bestehenden Marken- und Urheberrechte.</p>
<p>Etwaige verwendete Namen oder Abbildungen aus dem Tolkien-Universum dienen ausschließlich der Illustration eines gemeinnützigen Fan-Projekts ohne kommerzielle Absicht und werden sofort entfernt, sofern Rechteinhaber dies verlangen.</p>
`;

export const HaftungModal: React.FC<HaftungModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered onEsc={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent bg="gray.900" color="white" margin="25px" boxShadow="0 0 10px 0 rgba(24, 24, 24, 0.5)" maxWidth="calc(100vw - 50px)">
                <ModalHeader>Haftungsausschluss</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box
                        dangerouslySetInnerHTML={{ __html: haftungHtmlContent }}
                        sx={{
                            h1: { fontSize: '2xl', fontWeight: 'bold', mb: 4, mt: 2 },
                            h2: { fontSize: 'xl', fontWeight: 'bold', mb: 3, mt: 5 },
                            h3: { fontSize: 'lg', fontWeight: 'bold', mb: 2, mt: 4 },
                            p: { mb: 3, lineHeight: 'tall' },
                            ul: { ml: 6, mb: 3 },
                            li: { mb: 1 },
                            a: { color: 'blue.500', _hover: { textDecoration: 'underline' } },
                            strong: { fontWeight: 'semibold' },
                            br: { display: 'block', content: '""', mt: 1 }
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Schließen</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
