import { Updateblogs } from "../../actions/notes"

const CreateBlog = ()=>{

    return (
    <div>
        <form action={Updateblogs}>
        <div>
            <label>
                <p>Title</p>
                <input type="text" name="title"></input>
            </label>
        </div>
        <div>
            <label>
                <p>Author</p>
                <input type="text" name="author"></input>
            </label>
        </div>
        <div>
            <label>
                <p>Url</p>
                <input type="text" name="url"></input>
            </label>
        </div>
        <button type="submit"> Create </button>
        </form>
    </div>
)
}

export default CreateBlog