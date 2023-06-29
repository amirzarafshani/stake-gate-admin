/*eslint-env jquery*/
import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
import plansService from '../../../services/plansService';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Step1 from './Step1';

const data = {
  name: '',
  profit: '',
  min_amount: '',
  min_referrals: '',
  // min_deposit: '',
  referral_rate: '',
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

      plansService
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

    if (values.id) {
      // console.log(JSON.stringify(values));
      plansService
        .edit(values.id, JSON.stringify(values))
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
      plansService
        .add(JSON.stringify(values))
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
      min_amount: Yup.string().trim().nullable().required(' '),
      min_referrals: Yup.string().trim().nullable().required(' '),
      // min_deposit: Yup.string().trim().nullable().required(' '),
      referral_rate: Yup.string().trim().nullable().required(' '),
      profit: Yup.string().trim().nullable().required(' '),
    });
    return (
      <Formik
        enableReinitialize
        initialValues={data}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
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
