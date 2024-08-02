import axios, { AxiosResponse } from "axios";
import PostBoardRequestDto from "./request/post.board.request.dto";
import { DeleteBoardResponseDto, GetAllBoardResponseDto, GetBoardResponseDto, PatchBoardResponseDto, PostBoardResponseDto } from "./response/board";
import ResponseDto from "./response/response.dto";
import PatchBoardRequestDto from "./request/patch-board.request.dto";

const DOMAIN = 'http://localhost:8999';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const GET_ALL_BOARD_URL = () => `${API_DOMAIN}/board/list`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const PATCH_BOARD_URL = (itemNumber: number | string) => `${API_DOMAIN}/board/${itemNumber}`;
const GET_BOARD_URL = (itemNumber: number | string) => `${API_DOMAIN}/board/detail/${itemNumber}`;
const DELETE_BOARD_URL = (itemNumber: number | string) => `${API_DOMAIN}/board/delete/${itemNumber}`;


export const getAllBoardRequest = async () => {
    const result = await axios.get(GET_ALL_BOARD_URL())
        .then(response => {
            const responseBody: GetAllBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

export const getBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.get(GET_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const postBoardRequest = async (requestBody: PostBoardRequestDto) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody)
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const deleteBoardRequest = async (boardNumber: number | string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.data;
            return responseBody;
        });
    return result;
};

export const patchBoardRequest = async (boardNumber: number | string, requestBody: PatchBoardRequestDto) => {
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody)
        .then(response => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};

