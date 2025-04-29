interface Window {
    ethereum?: {
        isMetaMask?: boolean
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: (request: { method: string; params?: any[] }) => Promise<any>
    }
}
