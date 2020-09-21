describe("tests", () => {
  beforeEach(async () => {
    jasmine.attachToDOM(atom.views.getView(atom.workspace));

    /*    Activation     */
    // Trigger deferred activation
    atom.packages.triggerDeferredActivationHooks();
    // Activate activation hook
    atom.packages.triggerActivationHook("core:loaded-shell-environment");
    // Activate the package
    await atom.packages.activatePackage("ide-dlang");
  });

  it("Activation", async function () {
    expect(atom.packages.isPackageLoaded("ide-dlang")).toBeTruthy();
  });
});
