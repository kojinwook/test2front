import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBoardRequest, getAllBoardRequest } from "../../apis";
import DeleteBoardResponseDto from "../../apis/response/board/delete-board.response.dto";
import ResponseDto from "../../apis/response/response.dto";
import Board from "../../interface/board.interface";
import './index.css';


export default function Home() {

  const navigator = useNavigate();
  const [posts, setPosts] = useState<Board[]>([]);
  const [deletingBoardNumber, setDeletingBoardNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [temp, setTemp] = useState(0);
  // 필요한 요청 파라미터를 조립하여 api로 부터 데이터 받아와 업데이트하는 함수
  const getWeather = () => {
      const key =
          "paJ%2BM8y80vWX8Gu5RWTDurJ0y5rQCX4tjEwLh0F%2FwfUABNbw%2BV2iJD%2FBahqq08K%2BvzgPyAU0GFZ84LmVfEDPgA%3D%3D";

      const dd = new Date();
      const y = dd.getFullYear();
      const m = ("0" + (dd.getMonth() + 1)).slice(-2);
      const d = ("0" + dd.getDate()).slice(-2);
      const ds = y + m + d;

      const dd2 = new Date();
      const h = ("0" + dd2.getHours()).slice(-2);
      const ts = `${h}00`;

      var url =
          "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey= " +
          key +
          "&pageNo=1&numOfRows=1000&dataType=JSON" +
          "&base_date=" +
          ds +
          "&base_time=" +
          ts +
          "&nx=67&ny=100";

      fetch(url)
          .then((res) => res.json())
          .then((data) => {
              console.log(data.response.body.items.item);
              const itemArr = data.response.body.items.item;
              const result = {};
              itemArr.forEach((item:any) => {
                  if (item.category === "T1H") {
                      setTemp(item.obsrValue);
                  }
              });
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const result = await getAllBoardRequest();
        if (!result) return;
        const { code, boards } = result;
        if (code === 'DBE') {
          alert('데이터베이스 오류입니다.');
          return;
        }
        if (code !== 'SU') return;
        setPosts(boards);
      } catch (error) {
        console.error('게시물 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchPosts();
  }, []);

  const writePathClickHandler = () => {
    navigator(`/write`);
  }

  const deletePostClickHandler = (boardNumber: number | string) => {
    if (!boardNumber) {
      alert('게시물 번호가 없습니다.');
      return;
    };
    deleteBoardRequest(boardNumber).then(deleteBoardResponse);
  }

  const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
    if (responseBody && responseBody.code === 'SU') {
      alert('삭제되었습니다.');
      setPosts(posts.filter(post => post.boardNumber !== deletingBoardNumber));
    } else {
      alert('삭제 실패');
    }
    setDeletingBoardNumber(null);
  }

  const updatePostClickHandler = (boardNumber: number | string) => {
    navigator(`/update/${boardNumber}`);
  }

  return (
    <div className='main-contents-box'>
      <h2>게시물</h2>
      현재기온 : {temp}
      <button onClick={writePathClickHandler}>작성</button>
      <div className='main-current-contents'>
        {posts.map(post => (
          <li className="item" key={post.boardNumber}>
            <div onClick={() => navigator(`/detail/${post.boardNumber}`)}>{post.title}</div>
            <div>{post.content}</div>
            <button onClick={() => deletePostClickHandler(post.boardNumber)}>삭제</button>
            <button onClick={() => updatePostClickHandler(post.boardNumber)}>수정</button>
          </li>
        ))}
      </div>
    </div>
  )
}
