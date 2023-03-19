import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <h1>About this</h1>
      <p>Test page </p>
      <Link to='/'>Back</Link>
    </Card>
  )
}

export default AboutPage
