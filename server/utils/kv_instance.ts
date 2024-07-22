class KvSingleton {
    private static instance: Deno.Kv | null = null;

    private constructor() { }

    public static async getInstance(): Promise<Deno.Kv> {
        if (this.instance === null) {
            this.instance = await Deno.openKv();
        }
        return this.instance;
    }

    public static closeInstance(): void {
        if (this.instance !== null) {
            this.instance.close();
            this.instance = null;
        }
    }
}

export default KvSingleton;
