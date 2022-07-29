/*eslint-env jquery*/
import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
import slidersService from '../../../services/slidersService';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Step1 from './Step1';

const data = {
  name: '',
  image: '',
};

class EditForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      key: 'info',
      id: this.props.id,
      data: data,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { id } = this.state;

    if (id) {
      this.setState({ loading: true });

      slidersService
        .getById(id)
        .then((res) => {
          let data = res.data;

          // console.log(data);

          this.setState({ data: data, loading: false });
        })
        .catch((error) => {
          // console.log(error);

          this.setState({ loading: false });
        });
    } else {
      this.setState({ data: data });
    }
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.id, this.state.id);
    if (nextProps.id) {
      if (nextProps.id !== this.state.id) {
        this.setState({ id: nextProps.id }, () => {
          this.getData();
        });
      }
    } else {
      this.setState({ id: nextProps.id, data: data });
    }
  }

  handleSubmit = (values, setSubmitting) => {
    // this.setState({ loading: true });
    console.log(values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);

    if (values.id) {
      // console.log(JSON.stringify(values));
      slidersService
        .edit(values.id, formData)
        .then((res) => {
          // console.log(res.data);
          toastr.success('ویرایش پلن انجام شد');
          // history.push("/ubitexAdmin/users")
          this.props.onCloseAndReload();
          setSubmitting(false);
        })
        .catch((error) => {
          // console.log(error);
          setSubmitting(false);
        });
    } else {
      // console.log(JSON.stringify(values));
      slidersService
        .add(formData)
        .then((res) => {
          // // console.log(res);

          this.setState({ loading: false, data: res.data });
          toastr.success('ثبت پلن جدید انجام شد');
          this.props.onCloseAndReload();
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          // console.log(error);
        });
    }
  };

  handleError(error) {
    this.setState({ loading: false });
    // toastr.warning('مشکلی پیش آمد', error);
  }

  render() {
    const { data } = this.state;
    const ValidationSchema = Yup.object().shape({
      name: Yup.string().trim().nullable().required(' '),
      // image: Yup.mixed()
      //   .test('fileType', 'Unsupported File Format', function (value) {
      //     const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
      //     return SUPPORTED_FORMATS.includes(value.type);
      //   })
      //   .test('fileSize', 'File Size is too large', (value) => {
      //     const sizeInBytes = 500000; //0.5MB
      //     return value.size <= sizeInBytes;
      //   }),
    });
    return (
      <Formik
        enableReinitialize
        initialValues={data}
        onSubmit={(values, { setSubmitting }) => {
          console.log('here');
          this.handleSubmit(values, setSubmitting);
        }}
        validationSchema={ValidationSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            validateForm,
          } = props;
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <Step1 {...props} />
              </form>
              {this.state.loading ? <Loading /> : ''}
            </div>
          );
        }}
      </Formik>
    );
  }
}

export const Form = (props) => {
  return (
    <React.Fragment>
      <EditForm {...props} />
    </React.Fragment>
  );
};
