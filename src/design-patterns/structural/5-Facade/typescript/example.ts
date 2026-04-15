// ✅ GOOD: Facade Pattern - Simplifies a complex subsystem behind a clean interface

// ===== COMPLEX SUBSYSTEM =====

class CodecFactory {
  public extractAudio(file: string): string {
    console.log(`  [CodecFactory] Extracting audio stream from "${file}"`);
    return `audio_${file}`;
  }

  public extractVideo(file: string): string {
    console.log(`  [CodecFactory] Extracting video stream from "${file}"`);
    return `video_${file}`;
  }

  public getCodec(format: string): string {
    const codecs: Record<string, string> = {
      mp4: 'H.264',
      avi: 'MPEG-4',
      webm: 'VP9',
      mkv: 'H.265',
    };
    const codec = codecs[format] || 'H.264';
    console.log(`  [CodecFactory] Selected codec: ${codec} for format "${format}"`);
    return codec;
  }
}

class AudioMixer {
  public normalize(audioStream: string): string {
    console.log(`  [AudioMixer] Normalizing audio levels for "${audioStream}"`);
    return `normalized_${audioStream}`;
  }

  public adjustBitrate(audioStream: string, bitrate: number): string {
    console.log(`  [AudioMixer] Setting audio bitrate to ${bitrate}kbps`);
    return `${audioStream}_${bitrate}kbps`;
  }
}

class BitrateAnalyzer {
  public analyze(videoStream: string): number {
    console.log(`  [BitrateAnalyzer] Analyzing bitrate of "${videoStream}"`);
    const optimalBitrate = 4500;
    console.log(`  [BitrateAnalyzer] Optimal bitrate: ${optimalBitrate}kbps`);
    return optimalBitrate;
  }
}

class FileWriter {
  public write(videoStream: string, audioStream: string, codec: string, format: string): string {
    const outputFile = `output.${format}`;
    console.log(`  [FileWriter] Encoding with ${codec} codec`);
    console.log(`  [FileWriter] Muxing video and audio streams`);
    console.log(`  [FileWriter] Writing result to "${outputFile}"`);
    return outputFile;
  }
}

// ===== FACADE =====

class VideoConverter {
  private codecFactory: CodecFactory;
  private audioMixer: AudioMixer;
  private bitrateAnalyzer: BitrateAnalyzer;
  private fileWriter: FileWriter;

  constructor() {
    this.codecFactory = new CodecFactory();
    this.audioMixer = new AudioMixer();
    this.bitrateAnalyzer = new BitrateAnalyzer();
    this.fileWriter = new FileWriter();
  }

  public convert(file: string, format: string): string {
    // Orchestrates the entire conversion pipeline in the correct order
    const videoStream = this.codecFactory.extractVideo(file);
    const audioStream = this.codecFactory.extractAudio(file);
    const codec = this.codecFactory.getCodec(format);

    const optimalBitrate = this.bitrateAnalyzer.analyze(videoStream);

    const normalizedAudio = this.audioMixer.normalize(audioStream);
    const finalAudio = this.audioMixer.adjustBitrate(normalizedAudio, optimalBitrate > 4000 ? 192 : 128);

    const outputFile = this.fileWriter.write(videoStream, finalAudio, codec, format);
    return outputFile;
  }
}

// ============ DEMO ============

function main(): void {
  console.log('=== Facade Pattern: Video Conversion Library ===\n');

  const converter = new VideoConverter();

  console.log('--- Converting video via facade (single call) ---\n');
  const result = converter.convert('vacation.avi', 'mp4');

  console.log(`\nConversion complete: ${result}`);

  console.log('\n Benefits of Facade Pattern:');
  console.log('  - Client calls one method instead of orchestrating 4 subsystems');
  console.log('  - Subsystem initialization is handled by the facade');
  console.log('  - Correct execution order is guaranteed internally');
  console.log('  - Subsystem classes can still be used directly for advanced cases');
}

main();

export {};
