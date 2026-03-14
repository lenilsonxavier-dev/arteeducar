import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const infantilConfig = {
  background: '#fff9e6', // Um creme suave para parecer papel de desenho
  color: '#4a4a4a',      // Cinza escuro para leitura fácil, sem ser preto puro
  borderRadius: '30px',  // Bordas bem arredondadas (mais amigável para crianças)
  confirmButtonColor: '#ffcc00', // Amarelo vibrante (cor do botão "Entrar no Ateliê")
  cancelButtonColor: '#ff6b6b',  // Vermelho/Rosa para o botão de cancelar
  customClass: {
    popup: 'borda-colorida-fantastica',
    title: 'fonte-ludica-titulo',
  },
};

// Alerta de Sucesso (ex: ao salvar na galeria)
export const alertaSucesso = (titulo, mensagem) => {
  return MySwal.fire({
    ...infantilConfig,
    title: `<span>🌟 ${titulo}</span>`,
    text: mensagem,
    icon: 'success',
    confirmButtonText: 'Oba! ✨',
  });
};

// Alerta de Pergunta (ex: ao sair do ateliê)
export const perguntaSair = (titulo, mensagem) => {
  return MySwal.fire({
    ...infantilConfig,
    title: `<span>🎨 ${titulo}</span>`,
    text: mensagem,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, sair',
    cancelButtonText: 'Ficar e pintar!',
  });
};
