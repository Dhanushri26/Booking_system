export default function AvailableResources({ resources }) {

  return (

    <div className="bg-white border rounded shadow-sm mb-6 p-4">

      <h2 className="text-lg font-semibold mb-3">
        Available Resources
      </h2>

      {resources.length === 0 ? (
        <p className="text-gray-500">
          No resources currently available
        </p>
      ) : (

        <ul className="grid grid-cols-3 gap-3">

          {resources.map(r => (

            <li
              key={r.id}
              className="border rounded p-3 bg-green-50 text-green-700"
            >
              {r.name}
            </li>

          ))}

        </ul>

      )}

    </div>

  )

}