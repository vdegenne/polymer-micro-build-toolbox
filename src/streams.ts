/**
 * Waits for the given ReadableStream
 */
export function waitFor(stream: NodeJS.ReadableStream):
    Promise<NodeJS.ReadableStream> {
    return new Promise<NodeJS.ReadableStream>((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
    });
}

type PipeStream = (NodeJS.ReadableStream | NodeJS.WritableStream |
    NodeJS.ReadableStream[] | NodeJS.WritableStream[]);

/**
 * pipeStreams() takes in a collection streams and pipes them together,
 * returning the last stream in the pipeline. Each element in the `streams`
 * array must be either a stream, or an array of streams (see PipeStream).
 * pipeStreams() will then flatten this array before piping them all together.
 */
export function pipeStreams(streams: PipeStream[]): NodeJS.ReadableStream {
    return Array.prototype.concat.apply([], streams)
        .reduce((a: NodeJS.ReadableStream, b: NodeJS.ReadWriteStream) => {
            return a.pipe(b);
        });
}