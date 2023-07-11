interface Data<obj> {
    [propName: string]: obj;
}
interface Init {
    url: string;
    onOpen: () => void;
    onResponse: (res: any) => void;
    onError: (error: Event) => void;
    onClose: (e: CloseEvent) => void;
    retry?: number;
}
type Send = <obj>(data: Data<obj>) => void;
declare let send: Send;
declare let closeWS: () => void;
declare function initWebSocket({ url, onOpen, onResponse, onError, onClose, retry, }: Init): void;
export { initWebSocket, send, closeWS };
