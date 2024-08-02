import Board from "../../../interface/board.interface";
import ResponseDto from "../response.dto";

export default interface GetAllBoardResponseDto extends ResponseDto {
    boards: Board[];
}