import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Field, FieldProps } from 'formik';
import styled from 'styled-components';
// STYLES
import { media, primaryTheme } from 'lib/styles';
// FIREBASE
import { githubProvider, googleAuthProvider } from 'lib/firebase';
// HELPERS
import { validators } from 'lib/helpers';
// DUCKS
import { actions, effects, selectors } from 'redux/ducks/auth.duck';
// COMPONENTS
import { Content } from 'components/UI/Page';

const initialValues = {
  email: '',
  password: '',
};

interface MyFormValues {
  email: string;
  password: string;
}

interface Props {
  isAuthenticated: boolean;
  authLogin: (values: MyFormValues, setErrors, setSubmitting) => Promise<any>;
  authWithSocialNetwork: (prodiver: any) => void;
}

const Login: React.FC<Props> = ({
  isAuthenticated,
  authLogin,
  authWithSocialNetwork,
}) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Content>
      <LoginWrapper>
        <h1>Join us!</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={validators.auth}
          onSubmit={(values: MyFormValues, { setSubmitting, setErrors }) => {
            authLogin(values, setErrors, setSubmitting);
          }}
          render={({ handleSubmit, errors, ...rest }) => {
            return (
              <StyledForm onSubmit={handleSubmit}>
                <Notice>
                  If you don't have an account already, this form will create
                  you one.
                </Notice>
                <FormItem>
                  <Label>Email</Label>
                  <Field
                    name="email"
                    render={({ field, form }: FieldProps<MyFormValues>) => {
                      return (
                        <>
                          <Input
                            {...field}
                            className={
                              form.touched[field.name] &&
                              form.errors[field.name]
                                ? 'error'
                                : ''
                            }
                            type="text"
                            placeholder="Email"
                          />
                          {form.touched[field.name] &&
                            form.errors[field.name] && (
                              <Error>{form.errors[field.name]}</Error>
                            )}
                        </>
                      );
                    }}
                  />
                </FormItem>
                <FormItem>
                  <Label>Password</Label>
                  <Field
                    name="password"
                    render={({ field, form }: FieldProps<MyFormValues>) => (
                      <>
                        <Input
                          {...field}
                          className={
                            form.touched[field.name] && form.errors[field.name]
                              ? 'error'
                              : ''
                          }
                          type="password"
                          placeholder="Password"
                        />
                        {form.touched[field.name] &&
                          form.errors[field.name] && (
                            <Error>{form.errors[field.name]}</Error>
                          )}
                      </>
                    )}
                  />
                </FormItem>
                {!!Object.keys(errors).length && errors.form && (
                  <Error>{errors.form}</Error>
                )}
                <Button type="submit">Log In</Button>
              </StyledForm>
            );
          }}
        />
        <Divider>Or</Divider>
        <SocialWrapper>
          <button
            type="button"
            onClick={() => authWithSocialNetwork(githubProvider)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path
                d="M15.999.395C7.164.395 0 7.558 0 16.396c0 7.068 4.584 13.065 10.943 15.181.8.147 1.092-.347 1.092-.77 0-.38-.014-1.387-.022-2.722-4.451.967-5.39-2.145-5.39-2.145-.727-1.848-1.776-2.34-1.776-2.34-1.453-.993.11-.973.11-.973 1.605.113 2.45 1.65 2.45 1.65 1.428 2.444 3.745 1.738 4.657 1.328.145-1.034.559-1.739 1.016-2.139-3.553-.404-7.288-1.776-7.288-7.907 0-1.747.623-3.175 1.647-4.294-.165-.405-.714-2.03.156-4.234 0 0 1.344-.43 4.4 1.64a15.36 15.36 0 0 1 4.006-.539c1.359.007 2.728.184 4.006.54 3.054-2.07 4.395-1.64 4.395-1.64.873 2.202.324 3.828.159 4.233 1.026 1.12 1.645 2.547 1.645 4.294 0 6.146-3.741 7.5-7.305 7.895.574.494 1.086 1.47 1.086 2.963 0 2.14-.02 3.864-.02 4.39 0 .427.288.925 1.1.768C27.42 29.455 32 23.462 32 16.396c0-8.838-7.164-16-16.001-16"
                fill={primaryTheme.colors.white}
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => authWithSocialNetwork(googleAuthProvider)}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none">
                <rect
                  fill={primaryTheme.colors.white}
                  width="40"
                  height="40"
                  rx="2"
                />
                <path
                  d="M28.64 20.2c0-.63-.06-1.25-.16-1.84H20v3.48h4.84c-.2 1.13-.84 2.08-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.62z"
                  fill={primaryTheme.colors.blue}
                />
                <path
                  d="M20 29c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.82.54-1.85.86-3.06.86-2.34 0-4.33-1.58-5.04-3.7h-3v2.32C13.44 26.98 16.48 29 20 29z"
                  fill={primaryTheme.colors.green}
                />
                <path
                  d="M14.96 21.7c-.18-.53-.28-1.1-.28-1.7 0-.6.1-1.17.28-1.7v-2.34h-3c-.6 1.2-.96 2.6-.96 4.04 0 1.45.35 2.83.96 4.04l3-2.33z"
                  fill={primaryTheme.colors.yellow}
                />
                <path
                  d="M20 14.58c1.32 0 2.5.45 3.44 1.35l2.58-2.6C24.46 11.9 22.42 11 20 11c-3.52 0-6.56 2.02-8.04 4.96l3 2.33c.7-2.15 2.7-3.73 5.04-3.73z"
                  fill={primaryTheme.colors.red}
                />
              </g>
            </svg>
          </button>
        </SocialWrapper>
      </LoginWrapper>
    </Content>
  );
};
export default connect(
  state => ({
    isAuthenticated: selectors.getAuth(state),
  }),
  { ...actions, ...effects },
)(Login);

const LoginWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 500px;
  margin: 15px auto;
  background-color: rgba(20, 22, 24, 0.5);

  ${media.phone`
    margin-top: 0;
    margin-bottom: 0;
    background-color: transparent;
  `};

  ${media.smallPhone`
    width: 100%;
  `};

  h1 {
    text-align: center;
    background-color: ${({ theme }) => theme.colors.red};
    padding: 10px;
    margin: 0;
    ${media.phone`
      padding: 0;
      background-color: transparent;
    `};
  }
`;

const Notice = styled.div`
  padding: 20px 0;
  opacity: 0.7;
  font-size: 14px;

  ${media.phone`
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
  `};
`;

const Divider = styled.div`
  position: relative;
  display: block;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
  padding: 10px 0;
  opacity: 0.4;

  ::before,
  ::after {
    content: '';
    height: 1px;
    width: 40%;
    border-top: 1px solid hsla(0, 0%, 100%, 0.5);
    position: absolute;
    opacity: 0.6;
    padding: 0 10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  ::before {
    left: 0;
  }

  ::after {
    right: 0;
  }
`;

const StyledForm = styled.form`
  padding: 10px 30px;
  ${media.phone`
    padding: 10px;
  `};

  & > div:last-of-type {
    margin-bottom: 0;
  }
`;

const SocialWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 50px;
  padding: 10px 0;
  justify-content: center;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  svg {
    width: 30px;
    height: auto;

    :hover {
      opacity: 0.8;
    }
  }

  ${media.phone`
    padding-left: 20px;
    padding-right: 20px;
  `};
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
  font-size: 16px;
  border: 1px solid transparent;
  box-shadow: none;
  border-radius: 4px;
  &.error {
    border-color: ${({ theme }) => theme.colors.red};
    &:focus {
      box-shadow: 3px 3px 10px ${({ theme }) => theme.colors.red},
        0 0 0 1px ${({ theme }) => theme.colors.red};
    }
  }
`;

const Button = styled.button`
  display: block;
  margin-top: 26px;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  border-radius: 2px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const FormItem = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Error = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
`;
