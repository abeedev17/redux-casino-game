import { Fragment, useState } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, Coffee, X } from 'react-feather'
import { AvForm, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation-safe'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button } from 'reactstrap'
import { toast, Slide } from 'react-toastify'
import { useSkin } from '@hooks/useSkin'
import Avatar from '@components/avatar'
import useJwt from '@src/auth/jwt/useJwt'
import { handleLogin } from '@store/actions/auth'
import InputPasswordToggle from '@components/input-password-toggle'
import '@styles/base/pages/page-auth.scss'

const Register = () => {
  const [skin, setSkin] = useSkin()
  const history = useHistory()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)

  const logoBackGround = require(`@src/assets/images/logo/logo-background.png`).default
  const logoImg = require(`@src/assets/images/logo/logo.png`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const SuccessToast = ({ username }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title font-weight-bold'>Welcome, {username}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>You have successfully logged in as a user to Pharao´s world. Now you can start to play. Enjoy!</span>
      </div>
    </Fragment>
  )

  const ErrorToast = ({title, desc}) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='danger' icon={<X size={12} />} />
          <h6 className='text-danger ml-50 mb-0'>{title}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{desc}</span>
      </div>
    </Fragment>
  )

  const handleSubmit = (event, errors) => {
    if (errors && !errors.length) {
    //   useJwt
    //     .register({ username, email, password })
    //     .then(res => {
    //       if (res.data.error === 'email') {
    //         toast.error(<ErrorToast desc={`${email} is used by another account.`} title={`Error`} />, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    //       } else if (res.data.error === 'username') {
    //         toast.error(<ErrorToast desc={`${username} is used by another account.`} title={`Error`} />, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    //       } else {
    //         const data = { user: res.data.user, accessToken: res.data.accessToken }
    //         dispatch(handleLogin(data))
    //         toast.success(<SuccessToast username={email}/>, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    //         history.push('/')
    //       }
    //     })
    //     .catch(err => console.log(err))
    }
  }

  const handleUsernameChange = e => {
    const errs = errors
    if (errs.username) delete errs.username
    setUsername(e.target.value)
    setErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = errors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={logoImg} style={{ width: 90, height: 35, marginTop: -8}}/>
          <h2 className='brand-text text-primary ml-1'>Casino's World</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={logoBackGround} alt='Login V2' style={{ height: 550 }}/>
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Adventure starts here
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>

            <AvForm action='/' className='auth-register-form mt-2' onSubmit={handleSubmit}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                <AvInput
                  required
                  autoFocus
                  type='text'
                  placeholder='johndoe'
                  id='register-username'
                  name='register-username'
                  value={username}
                  onChange={handleUsernameChange}
                  className={classnames({ 'border-danger': Object.keys(errors).length && errors.username })}
                />
                {Object.keys(errors).length && errors.username ? (
                  <small className='text-danger'>{errors.username}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <AvInput
                  required
                  type='email'
                  id='register-email'
                  name='register-email'
                  value={email}
                  placeholder='john@example.com'
                  onChange={handleEmailChange}
                  className={classnames({ 'border-danger': Object.keys(errors).length && errors.email })}
                />
                {Object.keys(errors).length && errors.email ? (
                  <small className='text-danger'>{errors.email}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  required
                  tag={AvInput}
                  id='register-password'
                  name='register-password'
                  value={password}
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>
              <AvCheckboxGroup name='Remember Me' checked={terms} required>
                <AvCheckbox
                  customInput
                  type='checkbox'
                  id='remember-me'
                  value='Remember Me'
                  label={<Terms />}
                  className='custom-control-Primary'
                  onChange={e => setTerms(e.target.checked)}
                />
              </AvCheckboxGroup>
              <Button.Ripple
                block
                color='primary'
                disabled={!email.length || !password.length || !username.length || !terms}
              >
                Sign up
              </Button.Ripple>
            </AvForm>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
