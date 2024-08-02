import Board from "../../interface/board.interface";
import ResponseCode from "../../types/enums/response-code.enum";
import ResponseMessage from "../../types/enums/response-message-enum";


export default interface ResponseDto{
    boards: Board[];
    title: string;
    content: string;
    code: ResponseCode;
    message: ResponseMessage;
    success: boolean;
    status: string;
    data: any;
    board: Board;
}