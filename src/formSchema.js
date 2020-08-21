import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, 'Your name must be at least 2 characters long')
      .required('Please enter a name'),
    size: yup
        .string()
        .oneOf(['Small', 'Medium', 'Large', 'XL', 'Please select a size.']),
    specialInstructions: yup
        .string()
        .min(4, 'Please enter none if no special instructions.')
        .required('Please enter none if no special instructions.')
  })

export default formSchema