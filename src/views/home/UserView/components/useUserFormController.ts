import * as Yup from 'yup'

export function useUserFormController() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é Obrigátorio'),
    email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
    document: Yup.string().required('CPF é obrigatório'),
    password: Yup.string()
      .min(8, 'Senha deve ter pelo menos 8 digitos')
      .required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
      .required('Confirmação de senha é obrigatória')
  })

  return {
    schema
  }
}
