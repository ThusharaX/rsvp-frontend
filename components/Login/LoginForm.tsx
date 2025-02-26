import { useState } from 'react'
import NextImage from '../NextImage'
import SignInFormFields from './FormFields/SignInFormFields'
import SignUpFormFields from './FormFields/SignUpFormFields'
import googleLogo from '../../public/logos/google_colour.svg'
import { UserEndpoints } from '../../pages/api/user'
import LoadingOverlay from '../LoadingOverlay'
import FailedSnackbar from '../Common/Snackbars/FailedSnackbar'
import SuccessSnackbar from '../Common/Snackbars/SuccessSnackbar'

interface LoginFormProps {
  login: boolean
  loginToggleHandler: () => void
}

const LoginForm = ({
  login,
  loginToggleHandler,
}: LoginFormProps): JSX.Element => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false)
  const [openFailedSnackbar, setOpenFailedSnackbar] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [rememberMeValue, setRememberMeValue] = useState(false)

  const onSignInSubmitAction = (event: any) => {
    event.preventDefault()
    setShowLoading(true)

    const formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    UserEndpoints.signInUser(formData)
      .then(() => {
        setOpenSuccessSnackbar(true)
        setShowLoading(false)
        window.localStorage.setItem('RememberMe', rememberMeValue.toString())
        setTimeout(function () {
          setOpenSuccessSnackbar(false)
        }, 1500)
      })
      .catch((e) => {
        console.error(e)
        setOpenFailedSnackbar(true)
        setShowLoading(false)
        setTimeout(function () {
          setOpenFailedSnackbar(false)
        }, 1500)
      })
  }

  const onSignUpSubmitAction = (event: any) => {
    event.preventDefault()
    setShowLoading(true)

    const formData = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    }
    console.log(formData)
    UserEndpoints.signUpUser(formData)
      .then(() => {
        setOpenSuccessSnackbar(true)
        setShowLoading(false)
        setTimeout(function () {
          setOpenSuccessSnackbar(false)
        }, 1500)
      })
      .catch((error) => {
        console.error(error)
        setOpenFailedSnackbar(true)
        setShowLoading(false)
        setTimeout(function () {
          setOpenFailedSnackbar(false)
        }, 1500)
      })
  }

  const handleCheck = () => setRememberMeValue(!rememberMeValue)

  return (
    <>
      <LoadingOverlay show={showLoading} />
      <div className="flex flex-col order-1 lg:order-none items-center lg:w-6/12 lg:justify-center lg:transform lg:scale-90">
        <h2 className="font-inter font-extrabold text-blue text-3xl lg:text-2xl mb-2">
          {login ? 'LOGIN' : 'Sign Up'}
        </h2>
        <p className="font-inter text-textBlackSecondary font-medium mb-6 text-sm">
          {login ? 'Login' : 'Sign up'} to access the best things!
        </p>
        <button className="shadow-ds2 flex flex-row w-full lg:w-4/5 h-10 rounded-lg items-center justify-center leading-4 font-semibold font-inter text-sm mb-6">
          <NextImage
            classnames="w-4 h-4 mr-4 line"
            src={googleLogo}
            alt="sign up"
            layout="intrinsic"
            quality={90}
          />
          {login ? 'Sign in with Google' : 'Sign up with Google'}
        </button>
        <p
          className="text-sm border-b-2 w-full lg:w-4/5 text-center mb-2"
          style={{
            color: '#D2D2D2',
            lineHeight: '0.1rem',
            borderColor: '#D2D2D2',
          }}
        >
          <span className="px-3 bg-white">
            {login ? 'or Sign in with Email' : 'or Signup with Email'}
          </span>
        </p>
        {login ? (
          <SignInFormFields
            onSubmit={onSignInSubmitAction}
            handleCheck={handleCheck}
          />
        ) : (
          <SignUpFormFields onSubmit={onSignUpSubmitAction} />
        )}
        <button
          className="w-full lg:w-4/5 bg-lightBlue rounded-lg font-inter text-sm leading-6 text-white font-semibold h-10 mt-4 mb-2"
          form={login ? 'loginForm' : 'signUpForm'}
        >
          {login ? 'Login' : 'Sign Up'}
        </button>
        <div className="w-full lg:w-4/5">
          <p className="text-xs text-left font-semibold">
            {login ? 'Not Registered Yet?' : 'Already have an account?'}{' '}
            <span onClick={loginToggleHandler} className="text-blue cursor-pointer">
              {login ? 'Create An Account' : 'login'}
            </span>
          </p>
        </div>
      </div>

      <div
        className={
          openFailedSnackbar
            ? 'fixed top-24 md:top-3/4 left-0 w-full flex justify-center z-10 opacity-100 transition ease-in duration-200'
            : 'fixed top-24 md:top-3/4 left-0 w-full flex justify-center z-10 opacity-0 transition ease-in duration-200 pointer-events-none'
        }
      >
        <FailedSnackbar />
      </div>
      <div
        className={
          openSuccessSnackbar
            ? 'fixed top-24 md:top-3/4 left-0 w-full flex justify-center z-10 opacity-100 transition ease-in duration-200'
            : 'fixed top-24 md:top-3/4 left-0 w-full flex justify-center z-10 opacity-0 transition ease-in duration-200 pointer-events-none'
        }
      >
        <SuccessSnackbar action={login ? 'signIn' : 'signUp'} />
      </div>
    </>
  )
}

export default LoginForm
