import * as React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

interface MyFormValues {
  movieName: string;
}

interface Props {
  searchByKeyword: (name: string | object) => void;
}

const SearchBar: React.FC<Props> = ({ searchByKeyword }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ movieName: '' }}
      onSubmit={(values: MyFormValues, { setSubmitting, setFieldValue }) => {
        setSubmitting(false);
        searchByKeyword(values.movieName);
        setFieldValue('movieName', '');
      }}
      render={({ handleSubmit, isSubmitting }) => (
        <Wrapper>
          <Field
            name="movieName"
            render={({ field, form }: FieldProps<MyFormValues>) => (
              <>
                <MdSearch size="40px" />
                <Input {...field} placeholder="Search movies..." />
                {form.touched.movieName &&
                  form.errors.movieName &&
                  form.errors.movieName}
              </>
            )}
          />
        </Wrapper>
      )}
    />
  );
};

export default SearchBar;

const Wrapper = styled(Form)`
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translate(-50%, -50%);
    height: auto;

    path {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 100px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.red};
  border: 0;
  color: white;
  -webkit-appearance: none;
  outline: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
