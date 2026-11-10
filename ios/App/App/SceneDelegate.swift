import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = TabbedAppViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

final class TabbedAppViewController: UIViewController, UITabBarDelegate {
    private let webController = TabBridgeViewController()
    private let tabs = UITabBar()
    private let routes = ["/", "/ourpracticeareas", "/ourteam", "/approach", "/contact", "/sign-in"]

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground

        let titles = ["Home", "Practice", "Team", "Approach", "Contact", "Portal"]
        let icons = ["house", "briefcase", "person.2", "list.bullet", "envelope", "person.crop.circle"]
        tabs.items = titles.indices.map { index in
            UITabBarItem(title: titles[index], image: UIImage(systemName: icons[index]), tag: index)
        }
        tabs.selectedItem = tabs.items?.first
        tabs.delegate = self

        webController.onRouteChange = { [weak self] path in
            guard let self else { return }
            self.tabs.selectedItem = self.routes.firstIndex(of: path.lowercased()).flatMap { self.tabs.items?[$0] }
        }

        addChild(webController)
        let content = webController.view!
        content.translatesAutoresizingMaskIntoConstraints = false
        tabs.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(content)
        view.addSubview(tabs)

        let safeArea = view.safeAreaLayoutGuide
        NSLayoutConstraint.activate([
            content.topAnchor.constraint(equalTo: safeArea.topAnchor),
            content.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            content.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            content.bottomAnchor.constraint(equalTo: tabs.topAnchor),
            tabs.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tabs.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tabs.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor)
        ])
        webController.didMove(toParent: self)
    }

    func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        let path = routes[item.tag]
        webController.bridge?.eval(js: "window.dispatchEvent(new CustomEvent('alden-vale-tab', { detail: '\(path)' }));")
    }
}

final class TabBridgeViewController: CAPBridgeViewController {
    var onRouteChange: ((String) -> Void)?

    override func capacitorDidLoad() {
        let plugin = NativeTabsPlugin()
        plugin.onRouteChange = onRouteChange
        bridge?.registerPluginInstance(plugin)
    }
}

@objc(NativeTabsPlugin)
final class NativeTabsPlugin: CAPPlugin, CAPBridgedPlugin {
    let identifier = "NativeTabsPlugin"
    let jsName = "NativeTabs"
    let pluginMethods: [CAPPluginMethod] = [CAPPluginMethod(name: "setRoute", returnType: CAPPluginReturnPromise)]
    var onRouteChange: ((String) -> Void)?

    @objc func setRoute(_ call: CAPPluginCall) {
        let path = call.getString("path") ?? "/"
        DispatchQueue.main.async {
            self.onRouteChange?(path)
            call.resolve()
        }
    }
}
