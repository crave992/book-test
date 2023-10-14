import { useState, ChangeEvent } from 'react';

interface FormProps {
  fields: {
    name: string;
    value: string;
    type: string;
    label: string;
  }[];
  hasOneButton: boolean;
  onSubmit: (data: any) => void;
}

const Form = ({ fields, hasOneButton, onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <form className="space-y-4 w-full">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] !== undefined ? formData[field.name] : field.value}
              onChange={handleInputChange}
              className="form-input px-3 py-2 border rounded w-full text-black"
            />
          </div>
        ))}
        {hasOneButton ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => console.log('Second Button Clicked')}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
