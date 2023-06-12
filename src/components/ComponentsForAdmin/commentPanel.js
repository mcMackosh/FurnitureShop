import React, {useContext, useEffect, useState} from 'react';
import Star from "../../components/IMGcomponents/star.png"
import wStar from "../../components/IMGcomponents/whiteStar.png"
import Image from "react-bootstrap/Image"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import {observer} from "mobx-react-lite";
import "../../pages/css/ProductPage.css"
import {createComment, fetchAllComment, deleteComment} from "../../http/shopBase";
import {fet} from "../../http/userAPI";

// import {UserStore} from '../../store/userStore';
import {Context} from "../../index"
import { useParams } from 'react-router-dom';


const CommentPanel = observer(() => {

    const {user} = useContext(Context)
    const [text, setText] = useState('')
    const [comment, setComment] = useState([])
    const [pickStar, setPickStar] = useState(1)
    const [load, setLoad] = useState(false)
    const {id} = useParams()


    function choiseStar(el) {
      return el > pickStar ? wStar : Star
    }
    let rait = 5;

    const addComment = () => {
        const userId = user.getUser().id
        setLoad(false)
        console.log(JSON.stringify({furnitureId: id, userId, text, rait: pickStar}))
        createComment({furnitureId: id, userId, text, rait: pickStar}).then(data => {
            setComment(data.comment)
            setLoad(true)
        }).catch((e) => alert(e.message) ,setLoad(true))
    }

    const delComment = (idData) => {
        setLoad(false)
        deleteComment(idData).then(data => {
            
            setComment(data.comment)
            setLoad(true)
        }).catch(e => alert(e.message))
    }

    useEffect(() => {
        setLoad(false)
        fetchAllComment(id).then(data => {
            setComment(data.comment)
            setLoad(true)
        }).catch(e => alert(e.message))
    },[])

    return (
        <div>
            {!load == true ?
                <div>
                    <Spinner animation="border" />
                </div> :
                <div>
                    <h3 className="comnets-title">Comments</h3>
                    <div className="container">
                        <Form.Label>Create comment</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Enter Text
                            </InputGroup.Text>
                            <Form.Control
                                value={text}
                                onChange={e => setText(e.target.value)}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>

                        <div className="d-flex" style={{ marginBottom: '10px' }}>
                            Please pick rait:
                            {Array(5).fill(1).map((star, el) => <Image key={el} onClick={() => setPickStar(el + 1)} style={{ height: '20px', width: '20px' }} src={choiseStar(el + 1)} />)}
                        </div>
                        <Button variant='dark' onClick={addComment}>Send</Button>
                    </div>
                    <div className="comment_container">
                        <div className="comment__container opened" id="first-comment">
                            {comment.map(one =>
                                <div key={one.id} className="comment__card">
                                    <h3 className="comment__title">{one.text}</h3>
                                    <p>
                                        {one.user.login}
                                    </p>
                                    <div className="comment__card-footer">
                                        <span>Raiting</span>{Array(one.rait).fill(0).map((el, i) => <Image key={i} style={{ width: 18 }} src={Star} alt="" />)}
                                        {one.user.id === user.getUser().id? <Button variant='danger' onClick={() => delComment(one.id)}>Delete</Button> : <div></div>} 
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>}
        </div>
    )
});

export default CommentPanel;