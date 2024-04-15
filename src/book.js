
const Book = ({ img, title, author }) => {
    const click1 = () => {
        alert("hdeodje")
    }
    return (
        <article>
            <img src={img} alt="" />
            <h1>{title}</h1>
            <h3>{author} </h3>
            <button type='button' onClick={click1}>Submit</button>
        </article>
    );
};
export default Book