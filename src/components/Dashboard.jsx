import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, FileText, Calendar, Clock, Settings, LogOut, AlertTriangle, Video } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from './CustomDatePicker'; 

const Dashboard = () => {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newMedication, setNewMedication] = useState('');
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [newAddiction, setNewAddiction] = useState('');
  const [isAddingAddiction, setIsAddingAddiction] = useState(false);
  const datePickerRef = useRef(null);

  const [patientInfo, setPatientInfo] = useState({
    name: "Jane Doe",
    age: 28,
    gender: "Female",
    lastSession: "10/27/2024",
    tags: ["ADHD", "Low Mood", "Anxiety", "Social Skills"],
    sessions: [
      {
        id: 1,
        date: "2024-10-27",
        summary: "Discussed test anxiety and coping mechanisms. Patient showed improved ability to use breathing techniques.",
        mood: "Anxious but receptive",
        keyPoints: [
          "Math test anxiety remains primary concern",
          "Started using guided meditation app",
          "Reports better sleep with new routine"
        ],
        nextSteps: "Practice progressive muscle relaxation daily",
        medications: "None"
      }
    ],
    drugHistory: [
      { id: 1, name: "Medication A" },
      { id: 2, name: "Medication B" }
    ],
    addictions: [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" }
    ],
    recordings: [
      { id: 1, name: "Session 10/27/2024", url: "#" },
      { id: 2, name: "Session 10/20/2024", url: "#" }
    ]
  });

  const handleDateSelect = (date) => {
    const selectedSession = patientInfo.sessions.find(session => 
      new Date(session.date).toDateString() === date.toDateString()
    );
    
    if (selectedSession) {
      const element = document.getElementById(`session-${selectedSession.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setShowDatePicker(false);
  };

  const handleLastSessionClick = () => {
    setShowDatePicker(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [datePickerRef]);

  const handleAddTag = () => {
    const tagToAdd = newTag.trim();
    if (tagToAdd && !patientInfo.tags.includes(tagToAdd)) {
      setPatientInfo(prev => ({
        ...prev,
        tags: [...prev.tags, tagToAdd]
      }));
      setNewTag('');
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPatientInfo(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const now = new Date();
      const newSession = {
        id: patientInfo.sessions.length + 1,
        date: now.toLocaleDateString(),
        summary: newNote,
        mood: "To be evaluated",
        keyPoints: [],
        nextSteps: "",
        medications: "No changes"
      };

      setPatientInfo(prev => ({
        ...prev,
        sessions: [newSession, ...prev.sessions],
        lastSession: now.toLocaleDateString()
      }));
      setNewNote('');
    }
  };

  const handleAddMedication = () => {
    if (newMedication.trim()) {
      setPatientInfo(prev => ({
        ...prev,
        drugHistory: [
          ...prev.drugHistory,
          { id: Date.now(), name: newMedication.trim() }
        ]
      }));
      setNewMedication('');
      setIsAddingMedication(false);
    }
  };

  const handleAddAddiction = () => {
    if (newAddiction.trim()) {
      setPatientInfo(prev => ({
        ...prev,
        addictions: [
          ...prev.addictions,
          { id: Date.now(), name: newAddiction.trim() }
        ]
      }));
      setNewAddiction('');
      setIsAddingAddiction(false);
    }
  };

  const handleDeleteMedication = (id) => {
    setPatientInfo(prev => ({
      ...prev,
      drugHistory: prev.drugHistory.filter(item => item.id !== id)
    }));
  };

  const handleDeleteAddiction = (id) => {
    setPatientInfo(prev => ({
      ...prev,
      addictions: prev.addictions.filter(item => item.id !== id)
    }));
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-16 bg-white fixed left-0 top-0 h-full flex flex-col items-center py-6">
        {/* Logo */}
        <div className="text-orange-500 mb-8">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
          </svg>
        </div>
        
        {/* Nav Icons */}
        <div className="flex flex-col gap-6">
          <button className="p-3 text-orange-500 rounded-xl hover:bg-orange-50">
            <FileText className="w-6 h-6" />
          </button>
          <button className="p-3 text-gray-400 rounded-xl hover:bg-gray-50">
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-3 text-gray-400 rounded-xl hover:bg-gray-50">
            <Clock className="w-6 h-6" />
          </button>
          <button className="p-3 text-gray-400 rounded-xl hover:bg-gray-50">
            <Settings className="w-6 h-6" />
          </button>
        </div>
        
        <button className="mt-auto p-3 text-gray-400 rounded-xl hover:bg-gray-50">
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-20 pr-6 py-6">
  <div className="max-w-6xl mx-auto">
    {/* Patient Info Section */}
    <div className="flex justify-between items-start mb-8">
      <div className="flex gap-8">
        <img
          src="/api/placeholder/120/120"
          alt="Patient"
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex items-center">
              <span className="text-gray-500 min-w-20">Name:</span>
              <span className="font-medium">{patientInfo.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 min-w-16">Age:</span>
              <span className="font-medium">{patientInfo.age}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 min-w-20">Gender:</span>
              <span className="font-medium">{patientInfo.gender}</span>
            </div>
            <div className="flex items-center relative">
              <span className="text-gray-500 min-w-24">Last Session:</span>
              <span className="font-medium">{patientInfo.lastSession}</span>
              <button 
                onClick={handleLastSessionClick}
                className="ml-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Calendar className="w-4 h-4" />
              </button>
              {showDatePicker && (
                <div 
                  ref={datePickerRef}
                  className="absolute top-full right-0 mt-2 z-50"
                >
                  <CustomDatePicker
                    sessions={patientInfo.sessions}
                    onDateSelect={handleDateSelect}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex gap-2 items-center flex-wrap">
            {isAddingTag ? (
              <div className="flex items-center">
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Enter tag"
                  className="h-8 w-32 text-sm"
                  autoFocus
                />
                <button
                  onClick={() => setIsAddingTag(false)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAddingTag(true)}
                className="p-1.5 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
            {patientInfo.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-orange-500 text-white rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:bg-orange-600 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <AlertTriangle className="w-6 h-6 text-yellow-500" />
    </div>
          {/* Session Notes Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Session Notes:</h2>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <Textarea
                className="min-h-[120px] w-full border-0 resize-none p-0 focus:ring-0 placeholder:text-gray-500"
                placeholder="Enter session notes..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={handleAddNote}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Note
              </Button>
            </div>
          </div>
{/* Previous Sessions */}
{patientInfo.sessions.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4">Previous Sessions:</h3>
              <div className="space-y-4">
                {patientInfo.sessions.map((session) => (
                  <Card 
                    key={session.id}
                    id={`session-${session.id}`}
                    className="p-6"
                  >
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">Session: {session.date}</h4>
                        <span className="text-gray-500 text-sm">
                          Mood: {session.mood}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{session.summary}</p>
                      
                      {session.keyPoints.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Key Points:</h5>
                          <ul className="list-disc pl-5 space-y-1">
                            {session.keyPoints.map((point, index) => (
                              <li key={index} className="text-gray-600">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {session.nextSteps && (
                        <div>
                          <h5 className="font-medium mb-2">Next Steps:</h5>
                          <p className="text-gray-600">{session.nextSteps}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Cards Grid */}
          <div className="grid grid-cols-3 gap-8">
            {/* Drug History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <FileText className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-medium text-gray-900">Drug History</h3>
                </div>
                <button 
                  className="text-orange-500 hover:text-orange-600"
                  onClick={() => setIsAddingMedication(true)}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {isAddingMedication ? (
                  <div className="flex gap-2">
                    <Input
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      placeholder="Enter medication name"
                      className="flex-1"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleAddMedication()}
                    />
                    <Button 
                      onClick={handleAddMedication}
                      className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                    >
                      Add
                    </Button>
                    <Button 
                      onClick={() => setIsAddingMedication(false)}
                      variant="outline"
                      className="px-2 py-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  patientInfo.drugHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between group">
                      <span className="text-gray-700">{item.name}</span>
                      <button 
                        onClick={() => handleDeleteMedication(item.id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Addictions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <span className="text-orange-500 text-xl">🍷</span>
                  </div>
                  <h3 className="font-medium text-gray-900">Addictions</h3>
                </div>
                <button 
                  className="text-orange-500 hover:text-orange-600"
                  onClick={() => setIsAddingAddiction(true)}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {isAddingAddiction ? (
                  <div className="flex gap-2">
                    <Input
                      value={newAddiction}
                      onChange={(e) => setNewAddiction(e.target.value)}
                      placeholder="Enter category name"
                      className="flex-1"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleAddAddiction()}
                    />
                    <Button 
                      onClick={handleAddAddiction}
                      className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                    >
                      Add
                    </Button>
                    <Button 
                      onClick={() => setIsAddingAddiction(false)}
                      variant="outline"
                      className="px-2 py-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  patientInfo.addictions.map((item) => (
                    <div key={item.id} className="flex items-center justify-between group">
                      <span className="text-gray-700">{item.name}</span>
                      <button 
                        onClick={() => handleDeleteAddiction(item.id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Recent Session Recordings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Video className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-medium text-gray-900">Recent Session Recordings</h3>
              </div>
              <div className="space-y-4">
                {patientInfo.recordings.map((recording) => (
                  <div key={recording.id} className="flex items-center justify-between">
                    <span className="text-gray-700">{recording.name}</span>
                    <button className="text-gray-400 hover:text-gray-600">▶</button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
