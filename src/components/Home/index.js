import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CoursesItemsList from '../CoursesItemsList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.courses.map(EachCourse => ({
      id: EachCourse.id,
      logoUrl: EachCourse.logo_url,
      name: EachCourse.name,
    }))

    this.setState({coursesData: updatedData})
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => {
    const {coursesData} = this.state
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  renderSuccessView = () => {
    const {coursesData} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul className="courses-unordered-list">
          {coursesData.map(EachItem => (
            <CoursesItemsList coursesData={EachItem} key={EachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAgain = () => {
    this.getCoursesData()
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
          We cannot seem to find the page you are looking for.
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

  renderCourseDetails = () => {
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
    const {coursesData} = this.state
    return (
      <div className="home-main-container">{this.renderCourseDetails()}</div>
    )
  }
}
export default Home
