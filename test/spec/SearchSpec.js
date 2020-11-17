describe("User that uses search function", () => {
    var search;
    var iframe;

    beforeAll((done) => {
        iframe = document.getElementsByTagName("iframe")[0];
        iframe.src = "/shop/";
        iframe.addEventListener("load", () => {
            const waitFor = () => {
                if(iframe.contentWindow.document.getElementsByTagName("input").length > 0) {
                    search = iframe.contentWindow.document.getElementsByTagName("input")[0];
                    done();
                } else {
                    setTimeout(waitFor, 500);
                }
            };
            waitFor();
        }, false);
    });

    it("should be able to input text", () => {
        search.value = "camp";
        search._valueTracker.setValue("");
        search.dispatchEvent(new Event("change", { bubbles: true }));
        expect(iframe.contentWindow.document.getElementsByClassName("ProductList")[0].getElementsByTagName("li").length).toBeGreaterThan(0);
    });

    it("should be able to input text2", () => {
        search.value = "cam";
        search._valueTracker.setValue("camp");
        search.dispatchEvent(new Event("change", { bubbles: true }));
        expect(iframe.contentWindow.document.getElementsByClassName("ProductList")[0].getElementsByTagName("li").length).toBeGreaterThan(0);
    });
});