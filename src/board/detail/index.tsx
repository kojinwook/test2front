import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBoardRequest } from "../../apis";
import GetBoardResponseDto from "../../apis/response/board/get-board.response.dto";


const Detail: React.FC = () => {
  const { boardNumber } = useParams();
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!boardNumber) return;
        const response = await getBoardRequest(boardNumber) as GetBoardResponseDto;
        console.log(response)
        if (response.code !== "SU") throw new Error("Post not found");
        setPost(response.board); // response.data로 변경
        setLoading(false);
      } catch (error) {
        console.error("게시물 정보를 불러오는 중 오류가 발생했습니다:", error);
        alert("게시물 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };
    fetchPost();
  }, [boardNumber]);

  const backgoPathClickHandler = () => {
    navigator(`/`);
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>게시물 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <h1>{post.title}</h1>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Detail;
