import { ChangeEvent, useEffect, useState } from "react";
import useBoardStore from "../../store/board.store";
import { getBoardRequest, patchBoardRequest } from "../../apis";
import PostBoardRequestDto from "../../apis/request/post.board.request.dto";
import { useNavigate, useParams } from "react-router-dom";


export default function Update() {
    const {boardNumber} = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { title, setTitle } = useBoardStore();
    const { content, setContent } = useBoardStore();

    useEffect(() => {
        if(!boardNumber) return;
        const fetchBoardDetails = async () => {
            try {
                const response = await getBoardRequest(boardNumber);
                console.log(response);
                if (response.code === 'SU') {
                    setTitle(response.board.title);
                    setContent(response.board.content);
                } else {
                    alert('게시물 정보를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('게시물 정보를 불러오는 중 오류가 발생했습니다:', error);
                alert('게시물 정보를 불러오는 중 오류가 발생했습니다.');
            }
        };
        fetchBoardDetails();
    }, []);

    const updatePost = async () => {
        if(!boardNumber) return;
        try {
            const postRequest: PostBoardRequestDto = { title, content };
            const result = await patchBoardRequest(boardNumber, postRequest);
            if(!result) return;
            if (result.code === 'SU') {
                alert('게시물 수정 완료');
                navigate('/');
            } else {
                setErrorMessage('게시물 수정 실패');
            }
        } catch (error) {
            console.error('게시물 수정 중 오류가 발생했습니다:', error);
            setErrorMessage('게시물 수정 중 오류가 발생했습니다');
        }
    };

    const handleTitleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setTitle(value);
    };

    const handleContentInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setContent(value);
    };

    return (
        <div>
            <h2>게시물 수정</h2>
            <textarea
                value={title}
                onChange={handleTitleInputChange}
            />
            <br />
            <textarea
                value={content}
                onChange={handleContentInputChange}
            />
            <br />
            <button onClick={updatePost}>수정</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};
