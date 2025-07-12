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

interface CommunityGuidelinesModalProps {
    isOpen: boolean
    onClose: () => void
}

const guidelinesHtmlContent = `
<p><strong>Stand: 12. Juli 2025</strong></p>
<h2>Einleitung</h2>
<p>Unsere Community ist das Herzstück von „Erbe von Arda". Diese Richtlinien gelten für alle Kommunikationskanäle, einschliesslich Website, Discord-Server, In-Game-Chats, soziale Medien und jede andere Plattform, auf der unser Projekt repräsentiert wird.</p>
<h2>1. Grundwerte</h2>
<ul>
  <li><strong>Respekt:</strong> Behandle andere so, wie du selbst behandelt werden möchtest. Diskriminierung, Hassrede oder Belästigung werden nicht toleriert.</li>
  <li><strong>Inklusivität:</strong> Unser Ziel ist ein sicheres Umfeld für Personen aller Hintergründe und Identitäten.</li>
  <li><strong>Fair Play:</strong> Kein Cheating, Exploiting oder Doxing. Im Spiel und ausserhalb gelten dieselben moralischen Standards.</li>
  <li><strong>Konstruktivität:</strong> Feedback ist willkommen, solange es sachlich und lösungsorientiert bleibt.</li>
</ul>
<h2>2. Verbotene Inhalte & Verhaltensweisen</h2>
<ul>
  <li>Jegliche Form von <em>Hassrede, Extremismus, Terrorpropaganda</em> oder Gewaltandrohungen.</li>
  <li>Sexuell explizite, pornografische, jugendgefährdende oder anderweitig unangemessene Inhalte.</li>
  <li>Verletzung von Persönlichkeits-, Urheber-, Marken- oder Datenschutzrechten.</li>
  <li>Verbreitung persönlicher Informationen (Doxing) ohne ausdrückliche Zustimmung.</li>
  <li>Spamming, Flooding, Trolling oder Stören des sozialen Miteinanders.</li>
</ul>
<h2>3. Rollenspiel-spezifische Regeln</h2>
<ul>
  <li><strong>IC ≠ OOC:</strong> In-Character-Handlungen bleiben im Rollenspielkontext; OOC-Konflikte sind davon strikt getrennt zu halten.</li>
  <li><strong>Powergaming & Metagaming:</strong> Die Nutzung ausserhalb des Spiels erlangter Informationen oder erzwungene Handlungen anderer Charaktere sind untersagt.</li>
  <li><strong>Permadeath:</strong> Permanente Charaktertode erfordern beiderseitiges Einverständnis.</li>
</ul>
<h2>4. Meldeverfahren & Sanktionen</h2>
<p>Verstösse gegen diese Richtlinien können über das <strong>#report-ticket</strong>-System auf Discord oder per E-Mail an <a href="mailto:support@erbe-von-arda.de">support@erbe-von-arda.de</a> gemeldet werden. Sanktionen reichen von Verwarnungen über temporäre Sperren bis hin zu permanentem Ausschluss, abhängig von Schwere und Häufigkeit des Verstosses.</p>
<h2>5. Streitbeilegung</h2>
<p>Wir bevorzugen Dialog. Bei Konflikten setzt euch bitte zunächst privat mit den Beteiligten auseinander. Führt das Gespräch respektvoll. Sollte keine Einigung erzielt werden, wendet euch an das Moderationsteam.</p>
<h2>6. Änderungsvorbehalt</h2>
<p>Diese Richtlinien können jederzeit aktualisiert werden. Grössere Änderungen werden mindestens 7 Tage im Voraus angekündigt.</p>
`;

export const CommunityGuidelinesModal: React.FC<CommunityGuidelinesModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered onEsc={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent bg="gray.900" color="white" margin="25px" boxShadow="0 0 10px 0 rgba(24, 24, 24, 0.5)" maxWidth="calc(100vw - 50px)">
                <ModalHeader>Community-Richtlinien</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box dangerouslySetInnerHTML={{ __html: guidelinesHtmlContent }} sx={{
                        h1: { fontSize: '2xl', fontWeight: 'bold', mb: 4, mt: 2 },
                        h2: { fontSize: 'xl', fontWeight: 'bold', mb: 3, mt: 5 },
                        h3: { fontSize: 'lg', fontWeight: 'bold', mb: 2, mt: 4 },
                        p: { mb: 3, lineHeight: 'tall' },
                        ul: { ml: 6, mb: 3 },
                        li: { mb: 1 },
                        a: { color: 'blue.400', _hover: { textDecoration: 'underline' } },
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