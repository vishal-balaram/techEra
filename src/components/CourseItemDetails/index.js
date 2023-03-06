import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseDetailData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCourseDetail()
  }

  getCourseDetail = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    // const Url = `https://apis.ccbp.in/te/courses/:${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/te/courses/${id}`,
      options,
    )
    const courseData = await response.json()

    const updatedData = {
      description: courseData.course_details.description,
      imageUrl: courseData.course_details.image_url,
      id: courseData.course_details.id,
      name: courseData.course_details.name,
    }

    this.setState({courseDetailData: updatedData})
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {courseDetailData} = this.state
    const {description, id, imageUrl, name} = courseDetailData
    return (
      <div className="detail-card-container">
        <img src={imageUrl} alt={name} className="detail-image" />
        <div className="details-container">
          <h1 className="detail-heading">{name}</h1>
          <p className="detail-para">{description}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => {
    const {courseDetailData} = this.state
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  renderAgain = () => {
    this.getCourseDetail()
  }

  renderFailureView = () => {
    const {coursesData} = this.state
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for
        </p>
        <button
          onClick={this.renderAgain}
          className="retry-button"
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {courseDetailData} = this.state
    const {description, id, imageUrl, name} = courseDetailData

    return (
      <div className="main-details-container">{this.renderDetailsView()}</div>
    )
  }
}
export default CourseItemDetails

// {/* <div className="detail-card-container">
//           <img src={imageUrl} alt={name} className="detail-image" />
//           <div className="details-container">
//             <h1 className="detail-heading">{name}</h1>
//             <p className="detail-para">{description}</p>
//           </div>
//         </div> */}
