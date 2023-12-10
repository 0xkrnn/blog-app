import { useSelector } from "react-redux";
import { selectAllAuthors } from "./authorSlice";
import { useNavigate } from "react-router-dom";

function Authors() {

    const navigate = useNavigate()

    const authors = useSelector(selectAllAuthors)
    const author = authors.map((author) => {
        return <section key={author.id} className='post-sec' onClick={() => navigate(`/authors/${author.id}`)}>
            <h5>id : {author.id}</h5>
            <h5>Name : {author.name}</h5>
        </section>
    })

    return (
        <section className='post-container'>
            {author}
        </section>
    );
}

export default Authors;