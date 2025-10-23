import type { Policies as PoliciesType } from './Amenities.types';

type PoliciesProps = {
  p: PoliciesType;
};

const Policies = ({ p }: PoliciesProps) => {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Horários</h2>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>Check-in: {p.checkin}</li>
          <li>Check-out: {p.checkout}</li>
          {p.quietHours ? <li>Silêncio: {p.quietHours}</li> : null}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Políticas</h2>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>Fumar: {p.smoking ? 'permitido em áreas designadas' : 'não permitido'}</li>
          <li>Festas/eventos: {p.parties ? 'permitidos sob regras' : 'não permitidos'}</li>
          <li>Pets: {p.pets}</li>
          <li>
            Cancelamento: {p.cancelation}
            <button
              type="button"
              className="ml-2 text-sm font-medium text-teal-700 underline transition hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            >
              ver detalhes
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Policies;
