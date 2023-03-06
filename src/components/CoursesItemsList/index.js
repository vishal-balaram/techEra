import {Link} from 'react-router-dom'
import './index.css'

const CoursesItemsList = props => {
  const {coursesData} = props
  const {id, logoUrl, name} = coursesData
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="courses-list">
        <div className="courses-list-container">
          <img src={logoUrl} alt={name} className="course-logo" />
          <p className="course-heading">{name}</p>
        </div>
      </li>
    </Link>
  )
}
export default CoursesItemsList
