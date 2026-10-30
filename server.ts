/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Allow audio uploads up to 25MB
app.use(express.json({ limit: '25mb' }));

// Server-side GoogleGenAI initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * 1. Multi-turn Chat Endpoint
 * Supports models:
 * - gemini-4-argon: Complex OSHA root cause analysis & incident investigation
 * - gemini-3.8-flash: General plant safety advisor (default)
 * - gemini-3.1-flash-lite: Fast hazard checks and instant clearance
 */
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const {
      message,
      history = [],
      model = 'gemini-3.8-flash',
      role = 'advisor',
      systemInstruction,
    } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message string is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(503).json({
        error:
          'GEMINI_API_KEY is not configured on the server. Please set it in Settings > Secrets.',
      });
      return;
    }

    // Role-specific system instructions
    const defaultRoleInstructions: Record<string, string> = {
      advisor:
        'You are the SURAKSHA AI Lead Industrial Safety Advisor for a large manufacturing plant. ' +
        'Your job is to provide clear, practical, OSHA- and Factories Act 1948-compliant safety advice. ' +
        'Respond empathetically and authoritatively in the user\'s language (Hindi, English, or Tamil). ' +
        'Always prioritize immediate life-saving procedures, certified PPE, and step-by-step clarity.',
      specialist:
        'You are the SURAKSHA Senior LOTO & Machinery Reliability Specialist. ' +
        'You specialize in Lockout/Tagout (OSHA 1910.147), pneumatic/hydraulic zero-energy verification, ' +
        'pinch-point machine guarding, and heavy stamping press maintenance.',
      investigator:
        'You are the SURAKSHA Chief Incident Investigator & Root Cause Analyst. ' +
        'You specialize in deep forensic analysis of factory near-misses, arc flash failures, ' +
        'chemical exposure incidents, and corrective action preventive action (CAPA) plans.',
    };

    const activeInstruction =
      systemInstruction ||
      defaultRoleInstructions[role] ||
      defaultRoleInstructions.advisor;

    // Build chat history for ai.chats.create
    // Each history item in SDK should have role: 'user' | 'model' and parts: [{ text }]
    const formattedHistory = history.map((item: any) => ({
      role: item.role === 'assistant' || item.role === 'model' ? 'model' : 'user',
      parts: [{ text: item.text || item.content || '' }],
    }));

    const chat = ai.chats.create({
      model: model || 'gemini-3.8-flash',
      history: formattedHistory,
      config: {
        systemInstruction: activeInstruction,
      },
    });

    const response = await chat.sendMessage({
      message,
    });

    res.json({
      text: response.text || 'No response generated.',
      model,
    });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    const status = error?.status || 500;
    res.status(status).json({
      error: error?.message || 'Failed to generate chat response from Gemini API',
    });
  }
});

/**
 * 2. Audio Transcription Endpoint
 * Uses gemini-3.5-transcribe model for audio input via microphone
 */
app.post('/api/gemini/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm' } = req.body;

    if (!audioBase64 || typeof audioBase64 !== 'string') {
      res.status(400).json({ error: 'audioBase64 string is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(503).json({
        error:
          'GEMINI_API_KEY is not configured on the server. Please set it in Settings > Secrets.',
      });
      return;
    }

    // Clean any data URI prefix if present
    const base64Data = audioBase64.replace(/^data:[^;]+;base64,/, '');

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: base64Data,
      },
    };

    const textPart = {
      text:
        'Transcribe this factory safety voice query clearly and accurately. ' +
        'The speaker might be speaking Hindi, Indian English, or Tamil, or mixed Hinglish. ' +
        'Return only the exact transcribed speech text without formatting commentary or markdown wrappers.',
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: { parts: [audioPart, textPart] },
    });

    const transcript = (response.text || '').trim();

    res.json({
      transcript,
      model: 'gemini-3.5-transcribe',
    });
  } catch (error: any) {
    console.error('Gemini Audio Transcription Error:', error);
    const status = error?.status || 500;
    res.status(status).json({
      error: error?.message || 'Failed to transcribe audio with gemini-3.5-transcribe',
    });
  }
});

// Mount Vite in dev or serve dist in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SURAKSHA AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
