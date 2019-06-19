import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => (
  <Toaster
    suppressClassNameWarning
    hideProgressBar
    position="bottom-right"
    autoClose={3000}
  />
);
export default Toast;

const Toaster = styled(ToastContainer)`
  .Toastify__toast--success {
    background: ${({ theme }) => theme.colors.red};
  }
  .Toastify__toast--error {
    background: ${({ theme }) => theme.colors.yellow};
  }
`;
