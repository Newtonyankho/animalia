// /home/newton/projects/myava/frontend/app/calculator/diagnosis.tsx
'use client';

import React, { useState } from 'react';

// ===== Mock Engines (unchanged logic) =====
const mockDiagnosisEngine = (formData: BasicFormData): string[] => {
  const possibleDiseuses: string[] = [];

  if (formData.species.includes('Poultry')) {
    if (formData.eyes.includes('lacrimation') && formData.feeding.includes('anorexia')) {
      possibleDiseuses.push('Infectious Bronchitis');
    }
    if (formData.gait.includes('ataxia') || formData.posture === 'unable') {
      possibleDiseuses.push('Marek’s Disease');
    }
  }

  if (formData.species.includes('Pig')) {
    if (formData.eyes.includes('spots') && formData.bodyConditionScore <= 2) {
      possibleDiseuses.push('African Swine Fever');
    }
    if (formData.feeding.includes('anorexia') && formData.posture === 'one limb off') {
      possibleDiseuses.push('Foot-and-Mouth Disease');
    }
  }

  if (formData.species.includes('Cattle')) {
    if (formData.gait.includes('incoordination') && formData.eyes.includes('pale')) {
      possibleDiseuses.push('Bovine Viral Diarrhea');
    }
    if (formData.feces === 'muddy' && formData.bodyConditionScore <= 2) {
      possibleDiseuses.push('Parasitic Gastroenteritis');
    }
  }

  if (formData.species.includes('Shoats')) {
    if (formData.eyes.includes('lacrimation') && formData.feces === 'muddy') {
      possibleDiseuses.push('Peste des Petits Ruminants (PPR)');
    }
    if (formData.posture === 'unable' && formData.feeding.includes('anorexia')) {
      possibleDiseuses.push('Contagious Caprine Pleuropneumonia');
    }
  }

  if (possibleDiseuses.length === 0) {
    possibleDiseuses.push('No specific disease matched – monitor or consult expert.');
  }

  return possibleDiseuses;
};

const mockAIDiagnosis = (basicData: BasicFormData, advancedData: AdvancedFormData): string => {
  const { history, vaccinePG, feedSpecs } = advancedData;

  let summary = `AI Diagnostic Report:\n\n`;
  summary += `Species: ${basicData.species.join(', ')}\n`;
  summary += `Eyes: ${basicData.eyes.join(', ')}\n`;
  summary += `Gait: ${basicData.gait.join(', ')}\n`;
  summary += `Posture: ${basicData.posture}\n`;
  summary += `Feeding: ${basicData.feeding.join(', ')}\n`;
  summary += `Feces: ${basicData.feces}\n`;
  summary += `Body Condition Score: ${basicData.bodyConditionScore}\n\n`;

  if (history) summary += `History: ${history}\n`;
  if (vaccinePG) summary += `Vaccination/Prophylaxis: ${vaccinePG}\n`;
  if (feedSpecs) summary += `Feed Specifications: ${feedSpecs}\n\n`;

  if (basicData.species.includes('Poultry') && history?.toLowerCase().includes('sudden death')) {
    summary += '⚠️ High suspicion of Avian Influenza – isolate flock and notify authorities.';
  } else if (basicData.bodyConditionScore <= 2 && basicData.feces === 'muddy') {
    summary += '⚠️ Likely parasitic or bacterial enteritis – consider fecal exam and deworming.';
  } else {
    summary += 'No high-risk patterns detected. Continue supportive care and observation.';
  }

  return summary;
};

// ===== Types =====
type BasicFormData = {
  species: string[];
  eyes: string[];
  gait: string[];
  posture: string;
  feeding: string[];
  feces: string;
  bodyConditionScore: number;
};

type AdvancedFormData = {
  history: string;
  vaccinePG: string;
  feedSpecs: string;
};

// ===== Icons (as Unicode) =====
const Icons = {
  species: ' livestock',
  eyes: '👁️',
  gait: '🚶',
  posture: '🧘',
  feeding: '🍽️',
  animal: '🐄',
};

// ===== Main Component =====
const DiagnosisAssistant: React.FC = () => {
  const [basicData, setBasicData] = useState<BasicFormData>({
    species: [],
    eyes: [],
    gait: [],
    posture: 'normal',
    feeding: [],
    feces: 'normal',
    bodyConditionScore: 3,
  });

  const [advancedData, setAdvancedData] = useState<AdvancedFormData>({
    history: '',
    vaccinePG: '',
    feedSpecs: '',
  });

  const [basicDiagnosisResult, setBasicDiagnosisResult] = useState<string[] | null>(null);
  const [aiDiagnosisResult, setAiDiagnosisResult] = useState<string | null>(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // ===== Handlers =====
  const toggleChecklist = (field: keyof BasicFormData, value: string) => {
    setBasicData((prev) => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleRadioChange = (field: keyof BasicFormData, value: string) => {
    setBasicData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFecesChange = (value: string) => {
    setBasicData((prev) => ({ ...prev, feces: value }));
  };

  const handleBCSChange = (value: number) => {
    setBasicData((prev) => ({ ...prev, bodyConditionScore: value }));
  };

  const handleAdvancedChange = (field: keyof AdvancedFormData, value: string) => {
    setAdvancedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBasicDiagnose = () => {
    const result = mockDiagnosisEngine(basicData);
    setBasicDiagnosisResult(result);
    setAiDiagnosisResult(null);
  };

  const handleAIDiagnose = () => {
    const result = mockAIDiagnosis(basicData, advancedData);
    setAiDiagnosisResult(result);
    setBasicDiagnosisResult(null);
  };

  // ===== Helper: Render checklist group =====
  const renderChecklist = (
    label: string,
    icon: string,
    options: string[],
    field: keyof BasicFormData
  ) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        <span className="mr-2">{icon}</span>
        {label}
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="inline-flex items-center px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 cursor-pointer hover:bg-emerald-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={(basicData[field] as string[]).includes(option)}
              onChange={() => toggleChecklist(field, option)}
              className="sr-only"
            />
            <span className="flex items-center">
              {(basicData[field] as string[]).includes(option) ? (
                <span className="w-4 h-4 flex items-center justify-center bg-emerald-600 text-white rounded mr-2">✓</span>
              ) : (
                <span className="w-4 h-4 border-2 border-slate-400 rounded mr-2"></span>
              )}
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-slate-200">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Veterinary Clinical Diagnosis Assistant</h1>

      {/* Species */}
      {renderChecklist('Species', Icons.species, ['Poultry', 'Pig', 'Cattle', 'Shoats'], 'species')}

      {/* Eyes */}
      {renderChecklist('Eyes', Icons.eyes, ['normal', 'pale', 'pink', 'spots', 'lacrimation'], 'eyes')}

      {/* Gait */}
      {renderChecklist('Gait', Icons.gait, ['normal', 'ataxia', 'incoordination'], 'gait')}

      {/* Posture */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <span className="mr-2">{Icons.posture}</span>
          Posture
        </label>
        <div className="flex flex-wrap gap-4">
          {(['normal', 'one limb off', 'unable'] as const).map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="posture"
                checked={basicData.posture === option}
                onChange={() => handleRadioChange('posture', option)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className="ml-2 text-slate-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Feeding */}
      {renderChecklist('Feeding', Icons.feeding, ['normal', 'overfeed', 'anorexia', 'selective'], 'feeding')}

      {/* Feces & BCS */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          <span className="mr-2">{Icons.animal}</span>
          Body Condition & Feces
        </label>

        {/* Feces */}
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-600 mb-2">Feces Consistency</p>
          <div className="flex gap-6">
            {(['normal', 'muddy'] as const).map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="feces"
                  checked={basicData.feces === option}
                  onChange={() => handleFecesChange(option)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Body Condition Score */}
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">Body Condition Score (1–5)</p>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex items-center">
                <input
                  type="radio"
                  name="bcs"
                  checked={basicData.bodyConditionScore === num}
                  onChange={() => handleBCSChange(num)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-slate-700">{num}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Diagnose Button */}
      <button
        onClick={handleBasicDiagnose}
        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow transition-colors mb-8"
      >
        Run Basic Diagnosis
      </button>

      {/* Advanced Section */}
      <div className="border-t border-slate-200 pt-6">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center text-emerald-700 font-medium hover:text-emerald-900 transition-colors"
        >
          {isAdvancedOpen ? '▲ Hide Advanced AI Diagnosis' : '▼ Expand Advanced AI Diagnosis'}
        </button>

        {isAdvancedOpen && (
          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Clinical History</label>
              <textarea
                value={advancedData.history}
                onChange={(e) => handleAdvancedChange('history', e.target.value)}
                placeholder="Onset, duration, progression, other animals affected..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vaccination & Prophylaxis</label>
              <textarea
                value={advancedData.vaccinePG}
                onChange={(e) => handleAdvancedChange('vaccinePG', e.target.value)}
                placeholder="Vaccines administered, deworming, medications..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Feed Specifications</label>
              <textarea
                value={advancedData.feedSpecs}
                onChange={(e) => handleAdvancedChange('feedSpecs', e.target.value)}
                placeholder="Feed type, brand, changes, supplements..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={2}
              />
            </div>

            <button
              onClick={handleAIDiagnose}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow flex items-center justify-center gap-2 transition-colors"
            >
              <span>🧠</span>
              Generate AI-Powered Diagnosis Report
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {basicDiagnosisResult && (
        <div className="mt-8 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
          <h3 className="font-bold text-emerald-800 mb-2">Basic Diagnosis Result</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            {basicDiagnosisResult.map((disease, idx) => (
              <li key={idx}>{disease}</li>
            ))}
          </ul>
        </div>
      )}

      {aiDiagnosisResult && (
        <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl whitespace-pre-wrap">
          <h3 className="font-bold text-blue-800 mb-2">AI-Powered Diagnostic Report</h3>
          <p className="text-slate-700">{aiDiagnosisResult}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosisAssistant;