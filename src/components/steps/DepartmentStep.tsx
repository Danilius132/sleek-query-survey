import { useEffect, useState } from "react";
import { SurveyQuestion } from "@/components/SurveyQuestion";
import { supabase } from "@/integrations/supabase/client";

interface DepartmentStepProps {
  value: string;
  onChange: (value: string) => void;
}

interface Department {
  id: string;
  name: string;
}

export function DepartmentStep({ value, onChange }: DepartmentStepProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const { data, error } = await supabase
          .from('departments')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching departments:', error);
          return;
        }

        setDepartments(data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDepartments();
  }, []);

  const departmentOptions = departments.map(dept => ({
    value: dept.name.toLowerCase().replace(/\s+/g, '-'),
    label: dept.name
  }));

  if (isLoading) {
    return <div>Загрузка отделов...</div>;
  }

  return (
    <SurveyQuestion
      title="Общая информация"
      question="К какому отделу вы относитесь?"
      options={departmentOptions}
      value={value}
      onChange={onChange}
    />
  );
}