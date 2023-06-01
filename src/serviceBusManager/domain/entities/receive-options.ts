export interface ReceiveOptionsInterface {
    receiveMode?: "peekLock" | "receiveAndDelete",
    subQueueType?: "deadLetter" | "transferDeadLetter",
    maxAutoLockRenewalDurationInMs?: number,
    skipParsingBodyAsJson?: boolean;   
}