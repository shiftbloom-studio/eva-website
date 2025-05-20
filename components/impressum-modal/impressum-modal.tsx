import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Link,
} from '@chakra-ui/react'

interface ImpressumModalProps {
    isOpen: boolean
    onClose: () => void
    onPrivacyModalOpen?: () => void
}

export const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose, onPrivacyModalOpen }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered onEsc={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent bg="gray.900" color="white" margin="25px" boxShadow="0 0 10px 0 rgba(24, 24, 24, 0.5)">
                <ModalHeader>Impressum</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight="bold">Angaben gemäß § 5 TMG</Text>
                    <Text mt={2}>Fabian Zimber</Text>
                    <Text>Up de Worth 6a</Text>
                    <Text>22927 Großhansdorf</Text>
                    <Text mt={4} fontWeight="bold">Kontakt</Text>
                    <Text>Telefon: +49 (0) 172 8783421</Text>
                    <Text>E-Mail: projektleitung@erbe-von-arda.de</Text>
                    {/* Add more details as required by German law */}
                    <Text mt={4} fontWeight="bold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</Text>
                    <Text>Fabian Zimber</Text>
                    <Text>Anschrift wie oben</Text>

                    <Text mt={4}>
                        Weitere Informationen finden Sie in unserer{' '}
                        <Link href="#" color="blue.500" onClick={() => {
                            if (onPrivacyModalOpen) {
                                onPrivacyModalOpen();
                            }
                            onClose();
                        }}>
                            Datenschutzerklärung
                        </Link>
                        .
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Schließen</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 