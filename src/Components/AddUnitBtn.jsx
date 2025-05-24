import { IoMdArrowBack } from "react-icons/io";
const AddUnitBtn = () => {
  return (
    <div className="add-new-unit-btn-wrapper">
      <div className="add-new-unit-btn">
        <a href="/add-new-unit" className="btn">
          <span>عرض جميع الوحدات</span>
        </a>
        <IoMdArrowBack />
      </div>
      <div className="add-new-unit-btn">
        <a href="/add-new-unit" className="btn">
          <span>أضف وحدتك الان !</span>
        </a>
        <IoMdArrowBack />
      </div>
    </div>
  )
}

export default AddUnitBtn